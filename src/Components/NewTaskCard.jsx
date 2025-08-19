
import { useContext, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import CancelIcon from '@mui/icons-material/Cancel';
import AddTaskIcon from '@mui/icons-material/AddTask';

export default function NewTaskCard({ categoryId, onCancel }) {
    const { todoAppData, setTodoAppData } = useContext(GlobalContext);
    const [taskName, setTaskName] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskName.trim() === "") return;

        const taskExists = todoAppData.taskCategory.some(category => 
            category.tasks.some(task => task.taskName.toLowerCase() === taskName.toLowerCase())
        );

        if (taskExists) {
            alert(`Task with name "${taskName}" already exists.`);
            return;
        }

        const newTask = {
            taskName: taskName,
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
        <div className="bg-neutral-800 p-2 rounded">
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                    className="bg-neutral-700 text-white w-full p-4 rounded mb-2"
                    autoFocus
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
        </div>
    );
}
