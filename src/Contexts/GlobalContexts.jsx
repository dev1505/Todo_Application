import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LaunchIcon from '@mui/icons-material/Launch';
import VerifiedIcon from '@mui/icons-material/Verified';
import { createContext, useEffect, useState } from "react";
import TaskSpace from "../Components/TaskSpace";
import TitleBoard from "../Components/TitleBoard";

export const GlobalContext = createContext(null);

// export const defaultData = {
//     taskCategory: [
//         {
//             name: "Open",
//             id: 1,
//             tasks: [],
//             textColor: "text-red-300",
//         },
//         {
//             name: "Running",
//             id: 2,
//             tasks: [],
//             textColor: "text-green-300",
//         },
//         {
//             name: "Closed",
//             id: 3,
//             tasks: [],
//             textColor: "text-blue-300",
//         }
//     ],
//     taskCount: 0,
//     draggedData: {},
//     isDragged: false,
// }

export const defaultData = {
    taskCategory: [
        {
            name: "Open",
            id: 1,
            textColor: "text-red-300",
            tasks: [
                {
                    taskName: "Design login screen UI, Create a wireframe for the login screen including email and password fields.",
                    addedTime: new Date().toLocaleTimeString(),
                },
                {
                    taskName: "Set up project structure, Initialize the project repo with folders for components, services, and pages.",
                    addedTime: new Date().toLocaleTimeString(),
                },
                {
                    taskName: "Write API documentation, Document the backend API endpoints for tasks CRUD operations.",
                    addedTime: new Date().toLocaleTimeString(),
                },
            ],
        },
        {
            name: "Running",
            id: 2,
            textColor: "text-green-300",
            tasks: [
                {
                    taskName: "Implement task filtering by status, Add dropdown or tab UI to filter tasks by Open, Running, or Closed.",
                    addedTime: new Date().toLocaleTimeString(),
                },
                {
                    taskName: "Connect to Firebase backend, Set up Firebase project and integrate Firestore for task persistence.",
                    addedTime: new Date().toLocaleTimeString(),
                },
                {
                    taskName: "Add due date feature, Allow users to set and update due dates on tasks and show them in the UI.",
                    addedTime: new Date().toLocaleTimeString(),
                },
            ],
        },
        {
            name: "Closed",
            id: 3,
            textColor: "text-blue-300",
            tasks: [
                {
                    taskName: "Create basic layout and theme, Completed the initial responsive layout using Tailwind CSS.",
                    addedTime: new Date().toLocaleTimeString(),
                },
                {
                    taskName: "Add task creation form, Built a form to add new tasks with title, description, and default status.",
                    addedTime: new Date().toLocaleTimeString(),
                },
                {
                    taskName: "Deploy app to Vercel, Successfully deployed the working version of the app to Vercel.",
                    addedTime: new Date().toLocaleTimeString(),
                },
            ],
        },
    ],
    taskCount: 9,
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
                name: "Tasks",
                component: TaskSpace
            },
        ],
    }

    const icons = {
        Open: LaunchIcon,
        Running: DirectionsRunIcon,
        Closed: VerifiedIcon,
    }

    const storedData = localStorage?.getItem("taskData") ? JSON.parse(localStorage?.getItem("taskData"))?.taskCount > 0 ? JSON.parse(localStorage?.getItem("taskData")) : defaultData : defaultData;

    const [todoAppData, setTodoAppData] = useState({ ...storedData, ...componentData, ...icons });

    useEffect(() => {
        if (!todoAppData?.isDragged) {
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
