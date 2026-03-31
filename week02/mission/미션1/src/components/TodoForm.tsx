import { useState } from 'react';
import { useTodo } from '../context/TodoContext';


const TodoForm = () => { //form 관련 기능
    const [input,setInput] = useState<string>(''); //input 관리-> string 타입 한정
    const {addTodo} = useTodo();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault(); //새로고침 방지 
        const text = input.trim(); //공백 제거

        if(text){ //텍스트가 비어있지 않으면
            addTodo(text); //할 일 추가
            setInput(''); //입력창 초기화
        }
    };  

    return (
        <form onSubmit={handleSubmit} id="todo-form" className="todo-container__form">
                <input id="todo-input" className="todo-container__form-input" 
                value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder="할 일 입력" required/>
                <button className="todo-container__form-button" type="submit">할 일 추가</button>
    </form>
    )
};

export default TodoForm;