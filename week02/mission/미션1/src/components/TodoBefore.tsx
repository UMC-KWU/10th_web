//기존 컴포넌트 분리 전 전체 코드

import { useState } from 'react';
import { type TTodo } from '../types/todo';

const TodoBefore = () => { //컴포넌트 정의 -> 파일이름과 동일해야함(like 자바)
    const [todos,setTodos] = useState<TTodo[]>([]); //할일 목록 관리
    const [doneTasks,setDoneTasks] = useState<TTodo[]>([]);//완료된 일 목록 관리
    const [input,setInput] = useState<string>(''); //인풋 관리-> string 타입 한정

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        setInput(e.target.value); //인풋값 업데이트
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault(); //새로고침 방지 
        const text = input.trim(); //공백 제거

        if(text){ //텍스트가 비어있지 않으면
            const newTodo: TTodo = { id: Date.now(), text }; //새 할 일 객체 생성
            setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]); //할 일 목록에 새 할 일 추가
            setInput(''); //입력창 초기화
        }
    };   
    
    const handleComplete = (todo : TTodo) : void => { //완료 버튼 누른 경우
        setTodos((prevTodos) : TTodo[] => prevTodos.filter(t => t.id !== todo.id)); //할 일 목록에서 해당 할 일 제거
        setDoneTasks((prevDoneTasks) : TTodo[] => [...prevDoneTasks, todo]); //완료된 일 목록에 해당 할 일 추가
    };

    const handleDelete = (task : TTodo) : void => { //삭제 버튼 누른 경우
        setDoneTasks((prevDoneTasks) : TTodo[] => prevDoneTasks.filter(t => t.id !== task.id)); //완료된 일 목록에서 해당 할 일 제거
    }

    //on~~은 이벤트 핸들러 연결하는 속성 이름
    return (
    <>
        <div className='todo-container'>
            <h1 className="todo-container__header">532 TODO</h1>
            <form onSubmit={handleSubmit} id="todo-form" className="todo-container__form">
                <input id="todo-input" className="todo-container__form-input" 
                value={input} onChange={handleInputChange} type="text" placeholder="할 일 입력" required/>
                <button className="todo-container__form-button" type="submit">할 일 추가</button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {todos.map(todo => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button className="render-container__item-button" style={{backgroundColor: '#28a745'}} onClick={() => handleComplete(todo)}>완료</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">완료된 일</h2>
                    <ul id="done-list" className="render-container__list">
                        {doneTasks.map(task => (
                            <li key={task.id} className='render-container__item'>
                                <span className="render-container__item-text">{task.text}</span>
                                <button className="render-container__item-button" style={{backgroundColor: '#dc3545'}} onClick={() => handleDelete(task)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
    );
};

export default TodoBefore;