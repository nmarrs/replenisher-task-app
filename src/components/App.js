import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'

import logo from '../images/logo.png'
import './styles/App.css'
import { toggleCreateTaskModal, toggleEditTaskModal, toggleIsAdminView, assignTasksToUser, createTask, editTask } from '../actions'

import TaskColumn from './TaskColumn'
import CreateTaskForm from './CreateTaskForm'
import EditTaskForm from './EditTaskForm'

class App extends Component {
  static propTypes = {
    templateTasks: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isAdminView: PropTypes.bool.isRequired,
    createTaskModalOpen: PropTypes.bool.isRequired,
    editTaskModalOpen: PropTypes.bool.isRequired,
    toggleCreateTaskModal: PropTypes.func,
    toggleEditTaskModal: PropTypes.func,
    assignTasksToUser: PropTypes.func,
    createTask: PropTypes.func,
    currentTask: PropTypes.object
  }

  render() {
    const {
      toggleCreateTaskModal,
      createTaskModalOpen,
      toggleEditTaskModal,
      editTaskModalOpen,
      isAdminView,
      toggleIsAdminView,
      assignTasksToUser,
      templateTasks,
      user,
      createTask,
      editTask,
      currentTask
    } = this.props

    let switchUserViewButton = (
      isAdminView
      ? <button onClick={toggleIsAdminView} className='btn btn-info float-left m-3 viewButton'><i className="fas fa-user-ninja"></i> Switch to User View</button>
      : <button onClick={toggleIsAdminView} className='btn btn-info float-left m-3 viewButton'><i className="fas fa-user-tie"></i> Switch to Admin View</button>
    )

    let toDoTasks = user.tasks.filter((task) => ~['To Do'].indexOf(task.currentStatus))
    let inProgressTasks = user.tasks.filter((task) => ~['In Progress'].indexOf(task.currentStatus))
    let finishedTasks = user.tasks.filter((task) => ~['Finished'].indexOf(task.currentStatus))

    return (
      <div className="App">
        <header className="App-header">
          <h2>Replenisher Task Management <img src={logo} className="App-logo" alt="logo" /></h2>
        </header>
        <div>
          <button onClick={() => toggleCreateTaskModal(true)} className='btn btn-success float-right m-3'><i className="fas fa-plus"></i> Add New Task</button>
          { isAdminView
          ? <button onClick={() => assignTasksToUser(templateTasks)} className='btn btn-primary float-right m-3'><i className="fas fa-pen-square"></i> Assign Tasks to User</button>
          : <div />
          }

          { switchUserViewButton }

          { isAdminView
          ? <div>
            <h3 className='mt-3'><i className="fas fa-tasks"></i> Template Tasks</h3>
            <TaskColumn
              title={'Tasks'}
              tasks={templateTasks}
              toggleEditTaskModal={toggleEditTaskModal}
              editTaskModalOpen={editTaskModalOpen}
              isAdminView={isAdminView}
              editTask={editTask}
              currentTask={currentTask} />
          </div>
          : <div>
            <h3 className='mt-3'><i className="fas fa-tasks"></i> Current User Tasks</h3>
            <div className='container mb-5'>
              <div className='row'>
                <TaskColumn
                  title={'To Do'}
                  tasks={toDoTasks}
                  toggleEditTaskModal={toggleEditTaskModal}
                  editTaskModalOpen={editTaskModalOpen}
                  isAdminView={isAdminView}
                  editTask={editTask}
                  currentTask={currentTask} />
                <TaskColumn
                  title={'In Progress'}
                  tasks={inProgressTasks}
                  toggleEditTaskModal={toggleEditTaskModal}
                  editTaskModalOpen={editTaskModalOpen}
                  isAdminView={isAdminView}
                  editTask={editTask}
                  currentTask={currentTask} />
                <TaskColumn
                  title={'Finished'}
                  tasks={finishedTasks}
                  toggleEditTaskModal={toggleEditTaskModal}
                  editTaskModalOpen={editTaskModalOpen}
                  isAdminView={isAdminView}
                  editTask={editTask}
                  currentTask={currentTask} />
              </div>
            </div>
          </div>
          }

        </div>

        <Modal open={createTaskModalOpen} onClose={() => toggleCreateTaskModal(false)}>
          <CreateTaskForm
            createTask={createTask}
            toggleCreateTaskModal={toggleCreateTaskModal}
            isAdminView={isAdminView}
            isEditMode={false} />
        </Modal>

        <Modal open={editTaskModalOpen} onClose={() => toggleEditTaskModal(false)}>
          <EditTaskForm
            task={currentTask}
            toggleEditTaskModal={toggleEditTaskModal}
            isAdminView={isAdminView}
            editTask={editTask} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    templateTasks: state.templateTasks,
    user: state.user,
    createTaskModalOpen: state.createTaskModalOpen,
    editTaskModalOpen: state.editTaskModalOpen,
    isAdminView: state.isAdminView,
    currentTask: state.currentTask
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCreateTaskModal: (showCreateTaskModal) => {
      dispatch(toggleCreateTaskModal(showCreateTaskModal))
    },
    toggleEditTaskModal: (showEditTaskModal, task) => {
      dispatch(toggleEditTaskModal(showEditTaskModal, task))
    },
    toggleIsAdminView: () => {
      dispatch(toggleIsAdminView())
    },
    assignTasksToUser: (templateTasks) => {
      dispatch(assignTasksToUser(templateTasks))
    },
    createTask: (task, isAdminView) => {
      dispatch(createTask(task, isAdminView))
    },
    editTask: (task, isAdminView) => {
      dispatch(editTask(task, isAdminView))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
