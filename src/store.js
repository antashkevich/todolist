import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import axios from "axios";

const SET_TODOLISTS = "SET-TODOLISTS"
const ADD_TODOLIST = "ADD-TODOLIST";
const SET_TASKS = "SET-TASKS"
const ADD_TASK = "ADD-TASK";
const CHANGE_TASK = "CHANGE-TASK";
const REMOVE_TODOLIST = "REMOVE-TODOLIST"
const REMOVE_TASK = "REMOVE-TASK"

const initialState = {
    todolists: [
        // {
        //     id: 1,
        //     title: "What to learn",
        //     tasks: [
        //         {id: 1, title: "React", isDone: false, priority: "low"},
        //         {id: 2, title: "Redux", isDone: false, priority: "low"}
        //     ]
        // },
        // {
        //     id: 2,
        //     title: "Week tasks",
        //     tasks: [
        //         {id: 1, title: "Lesson 79", isDone: false, priority: "low"}
        //     ]
        // },
        // {
        //     id: 3,
        //     title: "Year tasks",
        //     tasks: [
        //         {id: 1, title: "React master", isDone: false, priority: "low"}
        //     ]
        // }
    ]
};

const reducers = (state = initialState, action) => {
    switch(action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({
                    ...tl, 
                    tasks: []
                }))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if(tl.id === action.todoListId) {
                        return {
                            ...tl, 
                            tasks: [...tl.tasks, action.newTask]
                        }
                    } else {
                        return tl;
                    }
                })
        }
        case SET_TASKS:
            debugger
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if(tl.id === action.todoListId) {
                        return {
                            ...tl, 
                            tasks: [...action.tasks]
                        }
                    } else {
                        return tl;
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if(t.id !== action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj}
                                }
                            })
                        }
                    } else {
                        return tl;
                    }
                })
            }
        case REMOVE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if(tl.id === action.todoListId) {
                        return {
                            ...tl, 
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    } else {
                        return tl;
                    }
                })
            }
        case REMOVE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todoListId)
            }
        default:
            return state;
    }
};

export const setTodoLists = (todolists) => ({ type: SET_TODOLISTS, todolists });

export const setNewTodoList = (newTodolist) => ({ type: ADD_TODOLIST, newTodolist });

export const setNewTask = (newTask, todoListId) => ({ type: ADD_TASK, newTask, todoListId });

export const setTask = (taskId, obj, todoListId) => ({ type: CHANGE_TASK, taskId, obj, todoListId });

export const setTasks = (tasks, todoListId) => ({ type: SET_TASKS, tasks, todoListId });

export const getTask = (taskId, todoListId) => ({ type: REMOVE_TASK, taskId, todoListId });

export const getTodolist = (todoListId) => ({ type: REMOVE_TODOLIST, todoListId });

export const getTodolists = () => {
    return (dispatch) => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                dispatch(setTodoLists(res.data));
            });
        }
};

export const addNewTodoList = (title) => {
    return (dispatch) => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",{
            title: title
        }, {
            withCredentials: true,
            headers: {
                "API-KEY": "678c75af-36b1-48ef-970e-df9f1f4c29ea",
            },
        }).then(res => {
                let newTodoList = res.data.data.item;
                dispatch(setNewTodoList(newTodoList));
            });
        }
};

export const getTodolistTasks = (todoListId) => {
    return (dispatch) => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`, 
        {
            withCredentials: true, 
            headers: {
                "API-KEY": "678c75af-36b1-48ef-970e-df9f1f4c29ea",
            }
        })
            .then(res => {
                debugger
                dispatch(setTasks(res.data.items, todoListId));
            });
        }
};

export const addNewTask = (newTask, todoListId) => {
    debugger
    return (dispatch) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`,{
            title: newTask.title

        },{
            withCredentials: true,
            headers: {
                "API-KEY": "678c75af-36b1-48ef-970e-df9f1f4c29ea",
            },
        }).then((res) => {
            debugger
                dispatch(setNewTask(res.data.data.item, todoListId));
            });
        }
};

export const changeTask = (taskId, obj, todoListId) => {
    return (dispatch) => {
        dispatch(setTask(taskId, obj, todoListId))
    }
};

export const removeTask = (taskId, todoListId) => {
    return (dispatch) => {
        dispatch(getTask(taskId, todoListId))
    }
};

export const removeTodolist = (todolistId) => {
    return (dispatch) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{
            withCredentials: true,
            headers: {
                "API-KEY": "678c75af-36b1-48ef-970e-df9f1f4c29ea",
            },
        })
            .then(() => {
                dispatch(getTodolist(todolistId));
            });
        }
};

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
