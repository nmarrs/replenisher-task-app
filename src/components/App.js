import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

import logo from '../images/logo.png'
import './styles/App.css'
import TaskColumn from './TaskColumn'
import CreateTaskForm from './CreateTaskForm'

let exampleTask = {
  id: 1,
  title: 'Example Task',
  priority: 3,
  timeEstimate: 2,
  notes: 'This is a task.This is a task.This is a task.This is a task.This is a task.This is a task.This is a task.',
  feedback: '',
  startTime: '',
  endTime: '',
  completionTime: '',
  currentStatus: 'To Do'
}

let exampleTask2 = {
  id: 2,
  title: 'Example Task 2',
  priority: 3,
  timeEstimate: 2,
  notes: 'This is a task 2.',
  feedback: '',
  startTime: '',
  endTime: '',
  completionTime: '',
  currentStatus: 'To Do'
}

class App extends Component {
  state = {
    createTaskModalOpen: false,
    isAdminView: true
  }

  onToggleCreateTaskModal = () => {
    this.setState({ createTaskModalOpen: !this.state.createTaskModalOpen })
  }

  onToggleAdminView = () => {
    this.setState({ isAdminView: !this.state.isAdminView })
  }

  assignTasks = () => {
    window.alert('assigning tasks soon!')
  }

  render() {
    const {
      createTaskModalOpen,
      isAdminView
    } = this.state

    let switchUserViewButton = (
      isAdminView
      ? <button onClick={this.onToggleAdminView} className='btn btn-info float-left m-3 viewButton'><i className="fas fa-user-ninja"></i> Switch to User View</button>
      : <button onClick={this.onToggleAdminView} className='btn btn-info float-left m-3 viewButton'><i className="fas fa-user-tie"></i> Switch to Admin View</button>
    )

    return (
      <div className="App">
        <header className="App-header">
          <h2>Replenisher Task Management <img src={logo} className="App-logo" alt="logo" /></h2>
        </header>
        <div>
          <button onClick={this.onToggleCreateTaskModal} className='btn btn-success float-right m-3'><i className="fas fa-plus"></i> Add New Task</button>
          { isAdminView
          ? <button onClick={this.assignTasks} className='btn btn-primary float-right m-3'><i className="fas fa-pen-square"></i> Assign Tasks to User</button>
          : <div />
          }

          { switchUserViewButton }

          { isAdminView
          ? <div>
            <h3 className='mt-3'><i className="fas fa-tasks"></i> Template Tasks</h3>
            <TaskColumn title={'Tasks'} tasks={[exampleTask, exampleTask2]} />
          </div>
          : <div>
            <h3 className='mt-3'><i className="fas fa-tasks"></i> Current User Tasks</h3>
            <div className='container mb-5'>
              <div className='row'>
                <TaskColumn title={'To Do'} tasks={[exampleTask, exampleTask2, exampleTask, exampleTask2]} />
                <TaskColumn title={'In Progress'} tasks={[exampleTask, exampleTask2]} />
                <TaskColumn title={'Finished'} tasks={[]} />
              </div>
            </div>
          </div>
          }

        </div>

        <Modal open={createTaskModalOpen} onClose={this.onToggleCreateTaskModal}>
          <CreateTaskForm
            closeModal={this.onToggleCreateTaskModal} />
        </Modal>
      </div>
    )
  }
}

export default App
