import { createContext, useState } from "react";
import TitleBoard from "../Components/TitleBoard";
import TaskSpace from "../Components/TaskSpace";

export const GlobalContext = createContext(null);

function GlobalContextsComponent({ children = "" }) {

    const [todoAppData, setTodoAppData] = useState({
        taskCategory: [
            {
                name: "Open",
            },
            {
                name: "Running",
            },
            {
                name: "Closed",
            }
        ],
        allComponents: [
            {
                name: "Title",
                component: TitleBoard
            },
            {
                name: "Tasks",
                component: TaskSpace
            },
        ]
    });

    return (
        <>
            <GlobalContext.Provider value={{ todoAppData, setTodoAppData }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

export default GlobalContextsComponent
