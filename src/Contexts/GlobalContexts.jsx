import { createContext, useEffect, useState } from "react";
import TitleBoard from "../Components/TitleBoard";
import TaskSpace from "../Components/TaskSpace";
import AddTask from "../Components/AddTask";

export const GlobalContext = createContext(null);

export const defaultData = {
    taskCategory: [
        {
            name: "Open",
            id: 1,
            tasks: [],
        },
        {
            name: "Running",
            id: 2,
            tasks: [],
        },
        {
            name: "Closed",
            id: 3,
            tasks: [],
        }
    ],
    taskCount: 0,
    draggedData: {},
    isDragged: false,
}

function GlobalContextsComponent({ children = "" }) {

    const componentData = {
        allComponents: [
            {
                name: "Title",
                component: TitleBoard
            },
            {
                name: "AddTask",
                component: AddTask
            },
            {
                name: "Tasks",
                component: TaskSpace
            },
        ],
    }

    const storedData = localStorage?.getItem("taskData") ? JSON.parse(localStorage?.getItem("taskData")) : defaultData;

    const [todoAppData, setTodoAppData] = useState({ ...storedData, ...componentData });

    useEffect(() => {
        if (todoAppData?.taskCount > 0 && !todoAppData?.isDragged) {
            const { allComponents, ...restData } = todoAppData;
            localStorage.setItem("taskData", JSON.stringify(restData));
        }
    }, [todoAppData])

    return (
        <>
            <GlobalContext.Provider value={{ todoAppData, setTodoAppData }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

export default GlobalContextsComponent
