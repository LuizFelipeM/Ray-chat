import { Request, Response } from "express"
import { chatsServ } from "../bootstrapper";
import { ResponseDtoGen } from "../utils/helper";
import IChats from "../interfaces/DB data/IChats";

const RespGen = new ResponseDtoGen<IChats | IChats[]>();

const chatsController = {
    async listChatsByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.query;
            const resp = await chatsServ.getChatListByUserEmail(email.toString());
            

            return res.json(resp);
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on listChatsByEmail - ${ex}` });
        }
    },

    createNewChat(req: Request, res: Response): Response {
        try {
            const { name, description, imgUrl } = req.body;
            const { userid } = req.headers;

            chatsServ.createNewChatAndAssigntoCreator(Number(userid), name, description, imgUrl);

            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on createNewChat - ${ex}` });
        }
    },

    deleteChat(req: Request, res: Response): Response {
        try {
            const { id } = req.params;
            chatsServ.deleteChat(Number(id));
    
            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on deleteChat - ${ex}` });
        }
    }
}

export default chatsController