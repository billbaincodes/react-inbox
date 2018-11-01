import React from 'react'
import Message from './Message'

const MessageList = ({ messageList, dataPatcher, messageSelector }) => {

  return (
    <div>
      {messageList.map(message => <Message  messageSelector={messageSelector} 
                                            dataPatcher={dataPatcher} 
                                            key={message.id} 
                                            message={message} />)}
    </div>
  )
  
}

export default MessageList