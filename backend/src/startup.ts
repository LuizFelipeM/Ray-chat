import http from "http";

import Websocket from "./services/socketioService";
import redisService from "./services/redisService";
import chatsContentsService from "./services/chatsContentsService";
import chatsService from "./services/chatsService";

function startup(server: http.Server): void {
    
    Websocket(server)
    // cacheMessages().then(() => Websocket(server))

    // setInterval(async () => {
    //     const ids = (await chatsServ.getAllChatsId()).map(id => id.id)
    //     const messages = await cacheServ.getAllMessagesByChat(ids)

    //     for await (const teste of messages) { // TODO - MELHORAR ISSO AQUI
    //         for (const key in teste  ) {
    //             if (teste.hasOwnProperty(key)) {
    //                 const val = teste[key].map(a => {
    //                     const val = JSON.parse(a)
    //                     delete val.user_name

    //                     return val
    //                 })

    //                 chatsContentsRepository.addMessagesToChats(val)
    //             }
    //         }
    //     }
    // }, 300000)
}

async function cacheMessages() {
    const chatIds = await chatsService.getAllChatsId()

    chatIds.forEach(async chat => {
        const messages = await chatsContentsService.getMessagesFromChat(chat.id)

        for (const message of messages)
            redisService.setMessage(message)
    })
}

export default startup