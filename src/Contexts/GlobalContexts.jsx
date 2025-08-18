import { createContext, useEffect, useState } from "react";
import AddTask from "../Components/AddTask";
import TaskSpace from "../Components/TaskSpace";
import TitleBoard from "../Components/TitleBoard";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LaunchIcon from '@mui/icons-material/Launch';
import VerifiedIcon from '@mui/icons-material/Verified';

export const GlobalContext = createContext(null);

export const defaultData = {
    taskCategory: [
        {
            name: "Open",
            id: 1,
            tasks: [],
            textColor: "text-red-300",
        },
        {
            name: "Running",
            id: 2,
            tasks: [],
            textColor: "text-green-300",
        },
        {
            name: "Closed",
            id: 3,
            tasks: [],
            textColor: "text-blue-300",
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

    const icons = {
        Open: DirectionsRunIcon,
        Running: LaunchIcon,
        Closed: VerifiedIcon,
    }

    const storedData = localStorage?.getItem("taskData") ? JSON.parse(localStorage?.getItem("taskData")) : defaultData;

    const [todoAppData, setTodoAppData] = useState({ ...storedData, ...componentData, ...icons });

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
