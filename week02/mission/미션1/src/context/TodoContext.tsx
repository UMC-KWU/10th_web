import { type TTodo } from '../types/todo';
import { createContext, useState, useContext } from 'react';
import { type PropsWithChildren } from 'react';

interface ITodoContext { //인터페이스
    todos: TTodo[];
    doneTasks: TTodo[];
    addTodo: (text: string) => void;
    completeTask: (todo: TTodo) => void;
    deleteTask: (task: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined); //컨텍스트 생성(|으로 초기값 설정)

export const TodoProvider = ({ children }: PropsWithChildren) => {
    const [todos,setTodos] = useState<TTodo[]>([]); //할일 목록 관리

    const [doneTasks,setDoneTasks] = useState<TTodo[]>([]);//완료된 일 목록 관리

    const addTodo = (text: string) : void => {
        const newTodo: TTodo = { id: Date.now(), text }; //새 할 일 객체 생성
        setTodos((prevTodos) : TTodo[] => [...prevTodos, newTodo]); //할 일 목록에 새 할 일 추가
    };

    const handleComplete = (todo : TTodo) => { //완료 버튼 누른 경우
        setTodos((prevTodos) : TTodo[] => prevTodos.filter(t => t.id !== todo.id)); //할 일 목록에서 해당 할 일 제거
        setDoneTasks((prevDoneTasks) : TTodo[] => [...prevDoneTasks, todo]); //완료된 일 목록에 해당 할 일 추가
    };

    const handleDelete = (task : TTodo) => { //삭제 버튼 누른 경우
        setDoneTasks((prevDoneTasks) : TTodo[] => prevDoneTasks.filter(t => t.id !== task.id)); //완료된 일 목록에서 해당 할 일 제거
    };

    return (<TodoContext.Provider 
    value={{ todos, doneTasks, addTodo, completeTask: handleComplete, deleteTask: handleDelete }}>
        {children}
    </TodoContext.Provider>
    );
};

export const useTodo = () => {
     const context = useContext(TodoContext);

     if (!context) { //에러 잡기 -> 컨텍스트 없는 경우
        throw new Error('useTodo must be used within a TodoProvider');
     }
    return context; //여기까지 내려온거면 -> 컨텍스트 무조건 있는 경우
}