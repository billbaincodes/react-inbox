import React from 'react';
import Message from './Message'

const MessageList = ({messageList, dataPatcher}) => {
    return (
      <div>
        {messageList.map(message => <Message dataPatcher={dataPatcher} key={message.id} message={message} />)}
      </div>
    )
  }

export default MessageList