
import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import CancelIcon from '@mui/icons-material/Cancel';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { motion } from "framer-motion";

export default function NewTaskCard({ categoryId, onCancel }) {
    const { todoAppData, setTodoAppData } = useContext(GlobalContext);
    const [taskName, setTaskName] = useState({ taskName: "", title: "" });

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskName?.title?.trim() === "") return;

        const taskExists = todoAppData.taskCategory.some(category =>
            category.tasks.some(task => task.title.toLowerCase() === taskName.title.toLowerCase())
        );

        if (taskExists) {
            alert(`Task with name "${taskName}" already exists.`);
            return;
        }

        const newTask = {
            taskName: taskName?.taskName,
            title: taskName?.title,
            addedTime: new Date().toLocaleTimeString(),
        };

        const updatedTaskCategory = todoAppData.taskCategory.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    tasks: [...category.tasks, newTask]
                };
            }
            return category;
        });

        setTodoAppData({
            ...todoAppData,
            taskCategory: updatedTaskCategory,
            taskCount: todoAppData.taskCount + 1
        });

        onCancel();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-stone-800 p-2 rounded"
        >
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={taskName?.title}
                    onChange={(e) => setTaskName({ ...taskName, title: e.target.value })}
                    placeholder="Enter task Title"
                    className="bg-stone-700 text-white w-full p-2 rounded mb-2"
                    autoFocus
                    required={true}
                />
                <input
                    type="text"
                    value={taskName?.taskName}
                    onChange={(e) => setTaskName({ ...taskName, taskName: e.target.value })}
                    placeholder="Enter task Description"
                    className="bg-stone-700 text-white w-full p-2 rounded mb-2"
                    required={true}
                />
                <div className="flex justify-between gap-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                        <AddTaskIcon />
                    </button>
                    <button type="button" onClick={onCancel} className="bg-red-600 text-white px-4 py-2 rounded">
                        <CancelIcon />
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
