import React, { Component } from 'react'
import './App.css'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import NewMessage from './components/NewMessage'


class App extends Component {

  state ={
    messageList: [],
    allSelected: false,
    compose: false
  }

  async componentDidMount() {
    this.dataFetcher()
  }

  dataFetcher = () => {
    fetch('http://localhost:8082/api/messages')
      .then(response => response.json())
      .then(data => this.setState({ messageList: data }))
      .then(() => this.state.messageList.map(message => {
        if (message.selected !== undefined) {          
          return message
        }
        else {
          message.selected = false 
          return message
        }
      }) 
    )
  }


  dataPatcher = (messageID, command, read) => {  
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': [messageID],
        'command': command,
        'read' : read
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', response))
    .then(this.dataFetcher)
    .catch(error => console.error('Error:', error))
  }


  dataPoster = (newMessage) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        'subject': newMessage.subjectValue,
        'starred': false,
        'labels': [],
        'body': newMessage.bodyValue,
        'id': this.state.messageList.length +1
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', response))
    .then(this.setState({compose: false}))
    .then(this.dataFetcher)
    .catch(error => console.error('Error:', error))
  }

  messageSelector = (id) => {
    let newMessages = this.state.messageList.map(message => {
      if (message.id === id) {
        message.selected = !message.selected
        return message
      }
      else{
        return message
      }
    })
    this.setState({ messageList: newMessages })
  }

  readMarker = () => {
    this.state.messageList.map(message => {
      if(message.selected) {
        this.dataPatcher(message.id, 'read', true)
      }
    })
  }

  unreadMarker = () => {
    this.state.messageList.map(message => {
      if(message.selected) {
        this.dataPatcher(message.id, 'read', false)
      }
    })
  }

  selectAll = () => {
    if (this.state.allSelected) {
      this.state.messageList.map(message => { message.selected = false })
      this.setState({ allSelected: false })
    }
    else {
      this.state.messageList.map(message => { message.selected = true })
      this.setState({ allSelected: true })
    }
  }


  composeToggle = () => {
    this.setState({ compose: !this.state.compose })
  }


  render() {

    return (
      <div className='col-md-12'>
        <Toolbar selectAll={this.selectAll} unreadMarker={this.unreadMarker} readMarker={this.readMarker} composeToggle={this.composeToggle} messageList={this.state.messageList}/>
        {this.state.compose ? <NewMessage dataPoster={this.dataPoster}/> : ''}
        <MessageList messageSelector={this.messageSelector} dataPatcher={this.dataPatcher} messageList={this.state.messageList}/>
      </div>
    )
  }
}

export default App