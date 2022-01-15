import { Server } from "http";
import socketio from "socket.io";

import room from "./roomService";
import { ChatsContentsDto } from "../interfaces/Dtos/ChatsContentsDto";
import redisService from "./redisService";
import chatsService from "./chatsService";
import usersService from "./usersService";
import chatsContentsService from "./chatsContentsService";

let io: socketio.Server

/* ----- TODO -----

    Melhorar e refatorar websocket, refatorar
    entidades, tipos e interfaces
*/

const Websocket = (server: Server) => {
    io = socketio(server)
    setup()
}

function setup(): void {
    io.on('connection', socket => {
        io.on('disconnect', () => console.log(`Socket ${socket.id} disconnected`))

        handleConnection(socket)

        handleMessage(socket)
    })
}

async function handleConnection(socket: socketio.Socket) {
    const email = socket.handshake?.query?.email?.toLowerCase()
    const password = socket.handshake?.query?.password

    const user = await usersService.getUserInformationByEmail(email)
    
    const scoketId = socket.id

    // const oldSocketId = await _cacheService.getDataByField('users', email)
    // console.log('oldSocketId', oldSocketId, 'scoketId', scoketId)

    // const oldConnection = io.clients()
    // const oldSocket = oldConnection[oldSocketId]

    // console.log('oldConnection', oldConnection,'oldSocket', oldSocket)

    
    // redisService.setData('users', email, scoketId)
    const id = user.id
    const name = user.name
    socket.emit('userInfo', { id, name })
    
    const chatList = await chatsService.getChatListByUserId(user.id)

    chatList.forEach(chat => socket.join(room.createName(chat.id), (err) => { if(err) console.error(err) }))
    
    socket.emit('chatList', chatList)
    //socket.emit('message', message));
}

function handleMessage(socket: socketio.Socket) {
    socket.on('message', (message: ChatsContentsDto) => {
        io.to(room.createName(message.chat_id))
            .emit('message', message)
    })
}

export default Websocket;