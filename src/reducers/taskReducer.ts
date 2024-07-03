// src/reducers/taskReducer.ts
interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
}

interface Action {
  type: 'ADD_TASK' | 'REMOVE_TASK' | 'TOGGLE_TASK' | 'SET_TASKS';
  payload: any;
}

function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload,
        ],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    default:
      throw new Error('Ação desconhecida');
  }
}

export default taskReducer;
