import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/TaskCard.css'

class TaskCard extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    toggleEditTaskModal: PropTypes.func.isRequired
  }

  render() {
    const {
      task,
      toggleEditTaskModal
    } = this.props

    return (
      <div className="card shadow font-title mt-3 TaskCard-card mx-auto">
        {/* eslint-disable-next-line */}
        <a onClick={() => toggleEditTaskModal(true, task)}>
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
      </div>
    )
  }
}

export default TaskCard;
