import React, { useContext } from 'react'
import IMessage from '../interfaces/Message'
import { ContainerContext } from '../contexts/ContainerContext'

function MessageBox(props: { content: IMessage }){
    const { userState } = useContext(ContainerContext)

    const dateParser = (dateString: string) => {
        const date = new Date(dateString)
        const currentDate = new Date()

        const year = date.getFullYear()
        const month = date.getMonth()
        const dt = date.getDate()

        if(currentDate.getDate() !== dt || currentDate.getMonth() !== month || currentDate.getFullYear() !== year){
            const dd = dt < 10 ? `0${dt.toString()}` : dt
            const mm = month < 10 ? `0${month + 1}` : month + 1
            
            return `${date.getHours()}:${date.getMinutes()} - ${dd}/${mm}/${year}`
        }

        return `${date.getHours()}:${date.getMinutes()}`
    }

    return (
        <div className={userState?.id === props?.content?.user_id ? "my-message" : "other-message"}>
            <div className="message-content">
                <header>
                    <span className="name">{props.content.user_name}</span>
                    <small className="timestamp">{dateParser(props.content.message_sent_at)}</small>
                </header>
                <span className="message">{props?.content?.message}</span>
            </div>
        </div>
    )
}

export default MessageBox