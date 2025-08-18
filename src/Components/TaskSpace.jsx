import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import TaskCard from "./TaskCard";

export default function TaskSpace() {
    const { todoAppData, setTodoAppData } = useContext(GlobalContext);

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

    return (
        <div className="py-6 px-2 h-screen bg-black text-gray-300">
            <div className="flex flex-col mx-2 gap-5 md:flex-row md:justify-evenly h-screen">
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
                                    className={`text-center mb-2 rounded border-1 border-gray-300 p-3 font-bold text-2xl`}
                                >
                                    <IconElement /> {data?.name}
                                </div>
                                <div
                                    className={`flex flex-col gap-2 md:border-1 md:border-gray-300 ${data?.tasks?.length > 0 && "border-1 border-gray-300"} text-sm p-3 bg-black flex-grow rounded overflow-auto`}
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
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
