import { rootReducer } from '.././index'

describe('reducer', () => {
  let testTask, testTask2
  beforeEach(() => {
    testTask = {
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
    }

    testTask2 = {
      id: 3,
      title: 'Stock shelves with unpacked items',
      priority: 5,
      timeEstimate: 2,
      notes: 'Take merchandise items and stock shelves with them. Be sure to place items in correct areas.',
      feedback: '',
      startTime: '',
      endTime: '',
      completionTime: '',
      currentStatus: 'To Do',
      rankWeight: 250
    }
  })

  describe('INITIAL_STATE', () => {
    it('is correct', () => {
      const action = { type: 'dummy_action' }

      expect(rootReducer(undefined, action)).toMatchSnapshot()
    })
  })

  describe('TOGGLE_CREATE_TASK_MODAL', () => {
    it('is correct', () => {
      let showCreateTaskModal = true
      const action = { type: 'TOGGLE_CREATE_TASK_MODAL', payload: showCreateTaskModal, task: testTask }

      expect(rootReducer(undefined, action)).toMatchSnapshot()
    })
  })

  describe('TOGGLE_EDIT_TASK_MODAL', () => {
    it('is correct', () => {
      let showEditTaskModal = true
      const action = { type: 'TOGGLE_EDIT_TASK_MODAL', payload: showEditTaskModal }

      expect(rootReducer(undefined, action)).toMatchSnapshot()
    })
  })

  describe('TOGGLE_IS_ADMIN_VIEW', () => {
    it('is correct', () => {
      const action = { type: 'TOGGLE_IS_ADMIN_VIEW' }

      expect(rootReducer(undefined, action)).toMatchSnapshot()
    })
  })

  describe('ASSIGN_TASKS_TO_USER', () => {
    it('is correct', () => {
      const action = { type: 'ASSIGN_TASKS_TO_USER', payload: [ testTask ] }

      expect(rootReducer(undefined, action)).toMatchSnapshot()
    })
  })

  describe('CREATE_TEMPLATE_TASK', () => {
    it('is correct', () => {
      const action = { type: 'CREATE_TEMPLATE_TASK', payload: testTask2 }

      let returnedState = rootReducer(undefined, action)
      expect(returnedState).toMatchSnapshot()
      // Check to ensure sorting works as expected
      expect(returnedState.templateTasks[0].rankWeight).toBe(250)
    })
  })

  describe('CREATE_TASK', () => {
    it('is correct', () => {
      const action = { type: 'CREATE_TASK', payload: testTask2 }

      expect(rootReducer(undefined, action)).toMatchSnapshot()
    })

    it('sorts correctly', () => {
      const action1 = { type: 'ASSIGN_TASKS_TO_USER', payload: [ testTask ] }
      const action2 = { type: 'CREATE_TASK', payload: testTask2 }

      // First add initial template tasks to user
      let firstState = rootReducer(undefined, action1)

      let nextState = rootReducer(firstState, action2)
      expect(nextState).toMatchSnapshot()
      // Check to ensure sorting works as expected
      expect(nextState.user.tasks[0].rankWeight).toBe(250)
    })
  })

  describe('EDIT_TEMPLATE_TASK', () => {
    it('is correct', () => {
      testTask.feedback = 'Some example feedback.'
      const action = { type: 'EDIT_TEMPLATE_TASK', payload: testTask }

      let returnedState = rootReducer(undefined, action)
      expect(returnedState).toMatchSnapshot()
    })
  })

  describe('EDIT_TASK', () => {
    it('is correct', () => {
      const action1 = { type: 'ASSIGN_TASKS_TO_USER', payload: [ testTask ] }
      testTask.feedback = 'Some example feedback.'
      const action2 = { type: 'EDIT_TASK', payload: testTask }

      // First add initial template tasks to user
      let firstState = rootReducer(undefined, action1)

      let nextState = rootReducer(firstState, action2)
      expect(nextState).toMatchSnapshot()
    })
  })

  describe('SORT_TASKS_BY_RANK', () => {
    it('is correct', () => {
      let templateTasks = [ testTask ]
      let userTasks = [ testTask2 ]
      const action = { type: 'SORT_TASKS_BY_RANK', sortedTemplateTasks: templateTasks, sortedUserTasks: userTasks }

      let returnedState = rootReducer(undefined, action)
      expect(returnedState).toMatchSnapshot()
    })
  })
})
