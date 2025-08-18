// TaskCard.jsx
import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function TaskCard({ taskData }) {

    const { setTodoAppData, todoAppData } = useContext(GlobalContext);


    function handleRemoveTask() {
        setTodoAppData({
            ...todoAppData,
            taskCount: todoAppData?.taskCount - 1,
            taskCategory: todoAppData?.taskCategory?.map((category) => {
                if (category?.id === taskData?.categoryId) {
                    return {
                        ...category,
                        tasks: category?.tasks?.filter((data) => data?.taskName !== taskData?.task?.taskName),
                    }
                }
                else {
                    return category;
                }
            })
        })
    }

    function handleDragStart() {
        setTodoAppData({ ...todoAppData, draggedData: taskData, isDragged: true });
    }

    return (
        <div
            className="flex border-1 shadow-1xl shadow-gray-500 border-gray-300 rounded p-2 shadow cursor-grab h-20 justify-between"
            draggable={true}
            onDragStart={(e) => handleDragStart(taskData?.task?.taskName)}
        >
            <div>
                <div
                    className="font-bold text-2xl"
                >
                    {taskData?.task?.taskName}
                </div>
                <div>
                    {taskData?.task?.addedTime}
                </div>
            </div>
            <div>
                <button
                    className="cursor-pointer flex items-center justify-center w-12 h-12 text-center"
                    type="button"
                    onClick={handleRemoveTask}
                >
                    <DeleteForeverIcon fontSize="large" />
                </button>
            </div>
        </div>
    );
}
