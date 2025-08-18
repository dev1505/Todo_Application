// TaskCard.jsx
import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import DeleteImage from "../Images/DeleteImage.jpg";

export default function TaskCard({ taskData }) {

    const { setTodoAppData, todoAppData } = useContext(GlobalContext);

    function handleRemoveTask() {

    }

    function handleDragStart() {
        setTodoAppData({ ...todoAppData, draggedData: taskData, isDragged: true });
    }

    return (
        <div
            className="flex bg-white rounded p-2 shadow cursor-grab h-20 justify-between"
            draggable={true}
            onDragStart={(e) => handleDragStart(taskData?.task?.taskName)}
        >
            <div>
                <div
                    className="text-gray-800 font-bold text-2xl"
                >
                    {taskData?.task?.taskName}
                </div>
                <div>
                    {taskData?.task?.addedTime}
                </div>
            </div>
            <div>
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={handleRemoveTask}
                >
                    <img src={DeleteImage} alt="sorry" className="h-15" />
                </button>
            </div>
        </div>
    );
}
