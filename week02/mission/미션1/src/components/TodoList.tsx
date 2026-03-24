import { type TTodo } from '../types/todo';

interface TodolistProps { //리스트 컴포넌트 인터페이스
    title: string;
    todos: TTodo[]; //동일한 타입 받기
    buttonLabel: string;
    buttonColor: string;
    onClick: (todo: TTodo) => void;
} 

const Todolist = ({title, todos, buttonColor, onClick} : TodolistProps) => { //리스트 관련 기능
    return (
        <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
            <ul id="todo-list" className="render-container__list">
                {todos.map(todo => (
                    <li key={todo.id} className="render-container__item">
                        <span className="render-container__item-text">{todo.text}</span>
                        <button className="render-container__item-button" style={{backgroundColor: buttonColor}} onClick={() => onClick(todo)}>완료</button>
                    </li>
                ))}
            </ul>
    </div>
    )
    
};

export default Todolist;