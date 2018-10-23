import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import NewMessage from './components/NewMessage'


class App extends Component {

  state ={
    messageList: [],
    selectedList: [],
    compose: false
  }


  async componentDidMount() {
    // const response = await fetch('http://localhost:8082/api/messages')
    // const json = await response.json()
    // this.setState({ messageList: json })
    await this.dataFetcher()
  }

  dataFetcher = () => {
    fetch('http://localhost:8082/api/messages')
      .then(response => response.json())
      .then(data => this.setState({ messageList: data }))
      .then(this.setState({ selectedList: this.state.messageList.filter(message => message.selected)}))
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
    .then(response => console.log('Success:', response))
    .then(this.dataFetcher)
    .catch(error => console.error('Error:', error))
  }

  dataPoster = () => {
    this.setState({compose: false})
    // fetch('http://localhost:8082/api/messages', {
    //   method: 'POST',
    //   body: JSON.stringify({

    //   }),
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    // .then(response => console.log('Success:', response))
    // .then(this.dataFetcher)
    // .catch(error => console.error('Error:', error))
  }

  selector = () => {
    
  }

  composeToggle = () => {
    this.setState({compose: !this.state.compose})
  }


  render() {

    return (
      <div className="col-md-12">
        <Toolbar composeToggle={this.composeToggle} messageList={this.state.messageList}/>
        {this.state.compose ? <NewMessage dataPoster={this.dataPoster}/> : ''}
        <MessageList dataPatcher={this.dataPatcher} messageList={this.state.messageList}/>
      </div>
    )
  }
}

export default App
