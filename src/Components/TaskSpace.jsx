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
                                    todoAppData?.draggedData?.task
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
        <div className="bg-red-300 py-6 px-2 h-screen">
            <div className="flex flex-col mx-2 gap-5 md:flex-row md:justify-evenly h-screen">
                {
                    todoAppData?.taskCategory?.map((data, index) => (
                        <div
                            id={data?.name}
                            className="bg-white shadow-md rounded-md p-4 w-full md:w-1/3 flex flex-col"
                            key={index}
                            onDragOver={(e) => { e.preventDefault() }}
                            onDrop={() => handleDraggedData(data)}
                        >
                            <div
                                className="text-lg font-semibold text-center mb-2"
                            >
                                {data?.name}
                            </div>
                            <div
                                className="flex flex-col gap-2 text-sm p-2 bg-pink-100 flex-grow rounded overflow-auto"
                            >
                                {
                                    data?.tasks?.map((task, index) => {
                                        return <div
                                            key={index}
                                        >
                                            <TaskCard taskData={{ task, category: data?.name, categoryId: data?.id }} />
                                        </div >
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
