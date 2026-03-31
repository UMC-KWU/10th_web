import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodo } from '../context/TodoContext';

const Todo = () => { //컴포넌트 분리했기에 코드가 간결해짐
    const {todos, doneTasks, completeTask, deleteTask } = useTodo(); 
    
    return (
        <div className='todo-container'>
            <h1 className="todo-container__header">532 TODO</h1>
            <TodoForm/>
            <div className="render-container">
                <TodoList title="할 일" todos={todos} buttonLabel="완료" buttonColor="#28a745" onClick={completeTask} />
                <TodoList title="완료된 일" todos={doneTasks} buttonLabel="삭제" buttonColor="#dc3545" onClick={deleteTask} />
            </div>
        </div>
    )
};

export default Todo;    
        