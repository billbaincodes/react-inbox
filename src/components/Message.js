import React from 'react'
import Label from './Label'

const Message = ({ message, dataPatcher, messageSelector }) => {

  let starSetter = () => {
    dataPatcher(message.id, 'star')   
  }

  return (
    <div className={`row message ${message.read === undefined || message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''} `}>
      <div className='col-xs-1'>
        <div className='row'>
          <div className='col-xs-2'>
            <input type='checkbox' onChange={() => messageSelector(message.id)} checked={ message.selected ? true : false} />
          </div>
          <div className='col-xs-2'>
            <i onClick={starSetter} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
          </div>
        </div>
      </div>
      <div className='col-xs-11'>
        {message.labels.map((label, i) => {return (<Label key={i} messageLabels={label} />)})}
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}


export default Message