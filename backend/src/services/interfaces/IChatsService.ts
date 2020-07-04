import IChats from "../../interfaces/DB data/IChats";

export default interface IChatsService {
    getAllChatsId(): Promise<{ id: number }[]>
    getChatListByUserId(userId: number): Promise<IChats[]>
    getChatListByUserEmail(email: string): Promise<IChats[]>
    createNewChatAndAssigntoCreator(userId: number, name: string, description?: string, imgUrl?: string): Promise<void>
    deleteChat(id: number): Promise<void>
    assignUserToChatByEmail(chatId: number, email: string): Promise<void>
}