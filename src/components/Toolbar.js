import React from 'react'

const Toolbar = ({ messageList, composeToggle, readMarker, unreadMarker, selectAll }) => {

  let unreadList = (messageList.filter(message => message.read !== undefined && message.read === false))

    return (
      <div className='row toolbar'>
      <div className='col-md-12'>
        <p className='pull-right'>
          <span className='badge badge'>{unreadList.length}</span>
          {unreadList.length === 1 ? 'unread message' : 'unread messages'}
        </p>
        <a onClick={composeToggle} className='btn btn-danger'>
          <i className='fa fa-plus'></i>
        </a>
        <button onClick={selectAll} className='btn btn-default'>
          <i className='fa fa-square-o'></i>
        </button>
        <button onClick={readMarker} className='btn btn-default'>
          Mark As Read
        </button>
        <button onClick={unreadMarker} className='btn btn-default'>
          Mark As Unread
        </button>
        <select className='form-control label-select' disabled='disabled'>
          <option>Apply label</option>
          <option value='dev'>dev</option>
          <option value='personal'>personal</option>
          <option value='gschool'>gschool</option>
        </select>
        <select className='form-control label-select' disabled='disabled'>
          <option>Remove label</option>
          <option value='dev'>dev</option>
          <option value='personal'>personal</option>
          <option value='gschool'>gschool</option>
        </select>
        <button className='btn btn-default' disabled='disabled'>
          <i className='fa fa-trash-o'></i>
        </button>
      </div>
    </div>
  )
  
} 

export default Toolbar