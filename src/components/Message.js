import React from 'react'
import Label from './Label'




const Message = ({ message, dataPatcher }) => {


  let starSetter = () => {
    dataPatcher(message.id, 'star')   
  }

  let readSetter = () => {
    dataPatcher(message.id, 'read')
  }

  return (
    <div onClick={readSetter} className={`row message ${message.read === undefined || message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''} `}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={message.selected ? true : false} />
          </div>
          <div className="col-xs-2">
            <i onClick={starSetter} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
      {message.labels.map(label => {return (<Label messageLabels={label} />)})}
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}


export default Message