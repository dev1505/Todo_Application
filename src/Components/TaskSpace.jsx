import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import TaskCard from "./TaskCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NewTaskCard from "./NewTaskCard";

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
            <div className="flex flex-col mx-1 gap-1 md:flex-row md:justify-evenly h-screen">
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
                                    className={`text-center flex justify-between mb-2 rounded bg-neutral-900 p-3 font-bold text-2xl`}
                                >
                                    <div>
                                        <IconElement /> {data?.name}
                                    </div>
                                    <div
                                        className="flex justify-end cursor-pointer"
                                        onClick={() => handleAddIndividualTask(data.id)}
                                    >
                                        <AddCircleIcon fontSize="large" />
                                    </div>
                                </div>
                                <div
                                    className={`flex flex-col gap-2 text-sm p-3 ${data.tasks.length === 0 ? 'hidden md:flex' : ''} bg-neutral-900 flex-grow rounded overflow-auto`}
                                >
                                    {
                                        data?.tasks?.map((task, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                >
                                                    <TaskCard taskData={{ task, category: data?.name, categoryId: data?.id }} />
                                                </div >
                                            )
                                        })
                                    }
                                    {addingTaskToCategory === data.id && (
                                        <NewTaskCard categoryId={data.id} onCancel={handleCancelAddTask} />
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
