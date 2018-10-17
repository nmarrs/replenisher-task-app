import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

const defaultState = {
  templateTasks: [{
    id: 1,
    title: 'Unload merchandise',
    priority: 3,
    timeEstimate: 2,
    notes: 'Unload merchandise from the bay door. Driver usually comes by at 6 am sharp.',
    feedback: '',
    startTime: '',
    endTime: '',
    completionTime: '',
    currentStatus: 'To Do',
    rankWeight: 150
  },
  {
    id: 2,
    title: 'Stock shelves with unpacked items',
    priority: 1,
    timeEstimate: 10,
    notes: 'Take merchandise items and stock shelves with them. Be sure to place items in correct areas.',
    feedback: '',
    startTime: '',
    endTime: '',
    completionTime: '',
    currentStatus: 'To Do',
    rankWeight: 10
  }],
  user: {
    tasks: []
  },
  currentTask: {},
  createTaskModalOpen: false,
  editTaskModalOpen: false,
  isAdminView: true
}

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_CREATE_TASK_MODAL':
      return {
        ...state,
        createTaskModalOpen: action.payload
      }
    case 'TOGGLE_EDIT_TASK_MODAL':
      return {
        ...state,
        editTaskModalOpen: action.payload,
        currentTask: action.task
      }
    case 'TOGGLE_IS_ADMIN_VIEW':
      return {
        ...state,
        isAdminView: !state.isAdminView
      }
    case 'ASSIGN_TASKS_TO_USER':
      return {
        ...state,
        user: {
          tasks: action.payload
        }
      }
    case 'CREATE_TEMPLATE_TASK':
      let templateTasks = [
        ...state.templateTasks,
        action.payload
      ]
      templateTasks.sort((a, b) => {
        return parseInt(b.rankWeight - a.rankWeight)
      })
      return {
        ...state,
        templateTasks: templateTasks
      }
    case 'CREATE_TASK':
      let userTasks = [
        ...state.user.tasks,
        action.payload
      ]
      userTasks.sort((a, b) => {
        return parseInt(b.rankWeight - a.rankWeight)
      })
      return {
        ...state,
        user: {
          ...state.user,
          tasks: userTasks
        }
      }
    case 'EDIT_TEMPLATE_TASK':
      return {
        ...state,
        templateTasks: state.templateTasks.map(
          (content, i) => content.id === action.payload.id
          ? { ...content, ...action.payload }
          : content
        )
      }
    case 'EDIT_TASK':
      return {
        ...state,
        user: {
          tasks: state.user.tasks.map(
            (content, i) => content.id === action.payload.id
            ? { ...content, ...action.payload }
            : content)
        }
      }
    case 'SORT_TASKS_BY_RANK':
      return {
        ...state,
        templateTasks: action.sortedTemplateTasks,
        user: {
          tasks: action.sortedUserTasks
        }
      }
    default:
      return state
  }
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger())
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
