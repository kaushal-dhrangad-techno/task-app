import { useSelector } from "react-redux"

interface Todo {
  title: string;
  completed: boolean
  // Add other properties if necessary
}

// Define the shape of the state (assuming todos is an array of Todo objects)
interface RootState {
  todos: Todo[];
}

const Task = () => {
  const todos = useSelector<RootState, Todo[]>((state)=> state.todos)
  return (
    <div>
      <div>
        Task component 
        <ul>
        {todos.map((todo:any)=> (
            <li key={todo.id}>{todo.title}</li>
          ))}
          </ul>
      </div>
    </div>
  )
}

export default Task