import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { motion } from "framer-motion";
import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";

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
        <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.01 }}
            className="bg-neutral-900 border-neutral-700 border rounded py-3 pl-3 text-neutral-300 shadow cursor-grab h-auto flex justify-between task-card"
            draggable={true}
            onDragStart={handleDragStart}
        >
            <div className="flex-grow w-0 mr-2">
                <div
                    className="rounded whitespace-normal break-words justify-evenly font-bold mb-2 text-white"
                >
                    {taskData?.task?.title}
                </div>
                <div
                    className="rounded whitespace-normal break-words justify-evenly"
                >
                    {taskData?.task?.taskName}
                </div>
                <div className="text-sm flex items-center gap-1 group mt-4">
                    <AccessTimeIcon fontSize="small" color="info" />
                    <span className="group-hover:text-white">{taskData?.task?.addedTime}</span>
                </div>
            </div>
            <div className={`flex items-center border-l-1 ${taskData?.borderStraightLine}`}>
                <button
                    className="cursor-pointer justify-center w-12 h-12 text-center hover:text-red-700"
                    type="button"
                    onClick={handleRemoveTask}
                >
                    <DeleteForeverIcon fontSize="large" />
                </button>
            </div>
        </motion.div>
    );
}