import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import NewMessage from './components/NewMessage'

class App extends Component {

  state ={
    messageList: [],
    compose: false
  }


  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messageList: json })
  }

  dataFetcher = () => {
    fetch('http://localhost:8082/api/messages')
      .then(response => response.json())
      .then(data => this.setState({ messageList: data }))
  }


  dataPatcher = (messageID, command) => {
    console.log(messageID, command)

    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        'messageIds': [messageID],
        'command': [command]
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    

    this.dataFetcher()
  }


  render() {

    return (
      <div className="col-md-12">
        <Toolbar messageList={this.state.messageList}/>
        <NewMessage />
        <MessageList dataPatcher={this.dataPatcher} messageList={this.state.messageList}/>
      </div>
    )
  }
}

export default App
