import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import TaskCard from "./TaskCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewTaskCard from "./NewTaskCard";
import { AnimatePresence } from "framer-motion";

export default function TaskSpace() {
    const { todoAppData, setTodoAppData } = useContext(GlobalContext);
    const [addingTaskToCategory, setAddingTaskToCategory] = useState(null);

    function handleDraggedData(data) {
        if (todoAppData?.draggedData?.categoryId !== data?.id) {
            setTodoAppData(
                {
                    ...todoAppData,
                    isDragged: false,
                    taskCategory: todoAppData?.taskCategory?.map((category) => {
                        if (data?.id === category?.id) {
                            return {
                                ...category,
                                tasks: [
                                    ...category.tasks,
                                    todoAppData?.draggedData?.task,
                                ],
                            }
                        }
                        else if (todoAppData?.draggedData?.categoryId === category.id) {
                            return {
                                ...category,
                                tasks: category?.tasks?.filter((data) => data?.taskName !== todoAppData?.draggedData?.task?.taskName),
                            }
                        }
                        else {
                            return category;
                        }
                    })
                }
            )
        }
    }

    function handleAddIndividualTask(categoryId) {
        setAddingTaskToCategory(categoryId);
    }

    function handleCancelAddTask() {
        setAddingTaskToCategory(null);
    }

    return (
        <div className="py-6 px-1 bg-black text-gray-300">
            <div className="flex flex-col mx-1 gap-5 md:gap-1 md:flex-row md:justify-evenly h-screen">
                {
                    todoAppData?.taskCategory?.map((data, index) => {
                        const IconElement = todoAppData[data?.name]
                        return (
                            <div
                                id={data?.name}
                                className={`shadow-md rounded-md p-0.5 w-full md:w-1/3 flex flex-col ${data.textColor}`}
                                key={index}
                                onDragOver={(e) => { e.preventDefault() }}
                                onDrop={() => handleDraggedData(data)}
                            >
                                <div
                                    className={`text-center flex justify-between md:mb-2 md:rounded ${data.tasks.length === 0 && addingTaskToCategory !== data.id ? "rounded-lg" : "rounded-t-lg"} bg-neutral-900 p-3 font-bold text-2xl`}
                                >
                                    <div>
                                        <IconElement /> {data?.name} {data?.tasks?.length}
                                    </div>
                                    <div
                                        className="flex justify-end cursor-pointer"
                                        onClick={() => handleAddIndividualTask(data.id)}
                                    >
                                        <AddCircleIcon fontSize="large" />
                                    </div>
                                </div>
                                <div
                                    className={`flex flex-col gap-2 text-sm p-3 ${data.tasks.length === 0 && addingTaskToCategory !== data.id ? 'hidden md:flex' : ''} bg-neutral-900 flex-grow md:rounded ${data.tasks.length === 0 && addingTaskToCategory !== data.id ? "rounded" : "rounded-b-lg"} overflow-auto`}
                                >
                                    <AnimatePresence>
                                        {
                                            data?.tasks?.map((task, index) => {
                                                return (
                                                    <TaskCard key={task.taskName} taskData={{ task, category: data?.name, categoryId: data?.id }} />
                                                )
                                            })
                                        }
                                        {addingTaskToCategory === data.id && (
                                            <NewTaskCard categoryId={data.id} onCancel={handleCancelAddTask} />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
