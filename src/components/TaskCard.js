import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'

import './styles/TaskCard.css'
import TaskCardDetail from './TaskCardDetail'

class TaskCard extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired
  }

  state = {
    taskDetailModalOpen: false
  }

  onToggleTaskDetailModal = () => {
    this.setState({ taskDetailModalOpen: !this.state.taskDetailModalOpen })
  }

  render() {
    const {
      taskDetailModalOpen
    } = this.state

    const {
      task
    } = this.props

    return (
      <div className="card shadow font-title mt-3 TaskCard-card mx-auto">
        <a onClick={this.onToggleTaskDetailModal}>
          <div className='card-title mt-3'>
            <h5>{task.title}</h5>
          </div>
          <div className='card-body'>
            <table className='table table-hover'>
              <tbody>
                <tr>
                  <th><i className="far fa-clock"></i> Estimate (hours)</th>
                  <td>{task.timeEstimate}</td>
                </tr>
                <tr>
                  <th><i className="fas fa-exclamation"></i> Priority Level (1-5)</th>
                  <td>{task.priority}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </a>

        <Modal open={taskDetailModalOpen} onClose={this.onToggleTaskDetailModal}>
          <TaskCardDetail
            selectedTask={task}
            closeModal={this.onToggleTaskDetailModal} />
        </Modal>
      </div>
    )
  }
}

export default TaskCard;
