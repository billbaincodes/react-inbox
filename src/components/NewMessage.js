import React, { Component } from 'react'

class NewMessage extends Component {

  constructor(props){
    super(props)
    this.state={
      subjectValue: '',
      bodyValue: ''
    }
  }

  subjectUpdater = (event) => {
    this.setState({subjectValue: event.target.value})
  }

  bodyUpdater = (event) => {
    this.setState({bodyValue: event.target.value})
  }

  dataPasser = () => {
    this.props.dataPoster(this.state)
  }

  render() {
    return (
      <form className='form-horizontal well'>
        <div className='form-group'>
          <div className='col-sm-8 col-sm-offset-2'>
          <h4>Compose Message</h4>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='subject' className='col-sm-2 control-label'>Subject</label>
            <div className='col-sm-8'>
              <input type='text' onChange={this.subjectUpdater} value={this.state.subjectValue} className='form-control' id='subject' placeholder='Enter a subject' name='subject' />
            </div>
          </div>
        <div className='form-group'>
          <label htmlFor='body' className='col-sm-2 control-label'>Body</label>
            <div className='col-sm-8'>
              <textarea name='body' onChange={this.bodyUpdater} value={this.state.bodyValue} id='body' className='form-control'></textarea>
            </div>
          </div>
        <div className='form-group'>
          <div className='col-sm-8 col-sm-offset-2'>
            <input onClick={this.dataPasser} value='Send' className='btn btn-primary' />
          </div>
        </div>
      </form>
    )
  }

}

export default NewMessage