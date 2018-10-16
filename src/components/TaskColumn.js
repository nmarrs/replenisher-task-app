import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/TaskColumn.css'
import TaskCard from './TaskCard'

class TaskColumn extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array
  }

  render() {
    const {
      title,
      tasks
    } = this.props

    return (
      <div className="card shadow font-title mt-3 TaskColumn-card mx-auto">
        <div className='card-title mt-3'>
          <h3>{title} - {tasks ? tasks.length : 0}</h3>
        </div>
        <div className='card-body'>
          {
            tasks && tasks.length > 0
            ? Object.entries(tasks).map(([key, task]) => (
              <div key={key}>
                  <TaskCard
                    task={task} />
              </div>
            ))
            : <div>No tasks</div>
          }

        </div>
      </div>
    )
  }
}

export default TaskColumn;
