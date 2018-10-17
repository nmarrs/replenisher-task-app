/**
  Action function that opens / closes the create task modal
*/
export const toggleCreateTaskModal = (showCreateTaskModal) => {
  return {
    type: 'TOGGLE_CREATE_TASK_MODAL',
    payload: showCreateTaskModal
  }
}

/**
  Action function that opens / closes the edit task modal
*/
export const toggleEditTaskModal = (showEditTaskModal, task) => {
  return {
    type: 'TOGGLE_EDIT_TASK_MODAL',
    payload: showEditTaskModal,
    task: task
  }
}

/**
  Action function that toggles the admin / user view
*/
export const toggleIsAdminView = () => {
  return {
    type: 'TOGGLE_IS_ADMIN_VIEW'
  }
}

/**
  Action function that assigns the current template tasks to the user
*/
export const assignTasksToUser = (templateTasks) => {
  window.alert('Tasks have been assigned to user!')
  return {
    type: 'ASSIGN_TASKS_TO_USER',
    payload: templateTasks
  }
}

/**
  Action function that creates a new task (template or regular)
*/
export const createTask = (task, isAdminView) => {
  if (isAdminView) {
    return {
      type: 'CREATE_TEMPLATE_TASK',
      payload: task
    }
  } else {
    return {
      type: 'CREATE_TASK',
      payload: task
    }
  }
}

/**
  Action function that edits a task (template or regular)
*/
export const editTask = (task, isAdminView) => {
  if (isAdminView) {
    return {
      type: 'EDIT_TEMPLATE_TASK',
      payload: task
    }
  } else {
    return {
      type: 'EDIT_TASK',
      payload: task
    }
  }
}
