import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/TaskCardDetail.css'

class TaskCardDetail extends Component {
  static propTypes = {
    selectedTask: PropTypes.object.isRequired,
    saveChanges: PropTypes.func,
    closeModal: PropTypes.func
  }

  //
  // handleNewOwnerInputChange = (event) => {
  //   this.setState({newOwner: event.target.value})
  // }

  handleSubmit = (e) => {
    e.preventDefault()

    // if (this.state.newOwner === '') {
    //   window.alert('Error, must enter new owner.')
    //   return
    // }
    //
    // this.props.performTransfer(this.props.currentOwner, this.state.newOwner)

    this.props.closeModal()
  }

  render() {
    const {
      selectedTask
    } = this.props

    return (
      <div className='TaskCardDetail-modal'>
        <h4 className='m-3'><i className="fas fa-info-circle"></i> Task Details</h4>
        <form>
          <div className='form-group'>
            <label htmlFor='taskTitle'><i className="fas fa-tag"></i> Title</label>
            <input className='form-control' id='taskTitleInput' defaultValue={selectedTask.title ? selectedTask.title : 'Error occurred'} />
          </div>
          <div className="form-group">
            <label htmlFor='taskStatus'><i className="fas fa-bolt"></i> Status</label>
            <select className="form-control" id="taskStatusSelect" defaultValue={selectedTask.currentStatus}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Finished</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='taskEstimate'><i className="far fa-clock"></i> Estimate (hours)</label>
            <input type='number' min='0' className='form-control' id='taskEstimateInput' defaultValue={selectedTask.timeEstimate} disabled />
          </div>
          <div className="form-group">
            <label htmlFor='taskPriority'><i className="fas fa-exclamation"></i> Priority Level (1-5)</label>
            <select className="form-control" id="taskPrioritySelect" defaultValue={selectedTask.priority} disabled>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='taskNotes'><i className="far fa-sticky-note"></i> Notes</label>
            <textarea className='form-control TaskCardDetail-textarea' id='taskNotesTextArea' defaultValue={selectedTask.notes} />
          </div>
          <div className='form-group'>
            <label htmlFor='taskFeedback'><i className="far fa-comments"></i> Feedback</label>
            <textarea className='form-control TaskCardDetail-textarea' id='taskFeedbackTextArea' defaultValue={selectedTask.feedback} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}><i className="fas fa-check"></i> Submit</button>
        </form>
      </div>
    )
  }
}

export default TaskCardDetail
