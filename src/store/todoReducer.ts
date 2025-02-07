export type TaskAction = { type: "ADD_TODO"; payload: string };

const todos = (state = [], action: TaskAction) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now().toString(),
          title: action.payload,
          completed: false,
        },
      ];

    default:
      return state;
  }
};

export default todos;
