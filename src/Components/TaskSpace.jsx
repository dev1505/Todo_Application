import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";
import NewTaskCard from "./NewTaskCard";
import TaskCard from "./TaskCard";
import { data } from 'framer-motion/client';

export default function TaskSpace() {
    const { todoAppData, setTodoAppData } = useContext(GlobalContext);
    const [addingTaskToCategory, setAddingTaskToCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(todoAppData?.taskCategory[0]?.id ?? 0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        function resize() {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', resize); // ✅ pass function, don't call it
        resize(); // Optional: call once immediately

        return () => window.removeEventListener('resize', resize);
    }, []);

    function handleDrop(e, categoryId) {
        e.preventDefault();
        const draggedTask = todoAppData?.draggedData?.task;
        const sourceCategoryId = todoAppData?.draggedData?.categoryId;
        if (draggedTask && sourceCategoryId) {
            const dropZone = document.getElementById(categoryId);
            if (!dropZone) return;
            const dropY = e.clientY;

            const cards = Array.from(dropZone.querySelectorAll('.task-card'));

            let newIndex = cards.length;

            const closest = cards.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = dropY - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;

            if (closest) {
                const closestIndex = cards.findIndex(c => c === closest);
                newIndex = closestIndex;
            }

            setTodoAppData(prevData => {
                const newCategories = [...prevData.taskCategory];
                const sourceCategory = newCategories.find(c => c.id === sourceCategoryId);
                const targetCategory = newCategories.find(c => c.id === categoryId);

                if (sourceCategory && targetCategory) {
                    const taskIndex = sourceCategory.tasks.findIndex(t => t.taskName === draggedTask.taskName);
                    if (taskIndex > -1) {
                        const [taskToMove] = sourceCategory.tasks.splice(taskIndex, 1);
                        targetCategory.tasks.splice(newIndex, 0, taskToMove);
                    }
                }

                return {
                    ...prevData,
                    taskCategory: newCategories,
                    isDragged: false,
                    draggedData: null,
                };
            });
        }
    }

    function handleAddIndividualTask(categoryId) {
        setAddingTaskToCategory(categoryId);
    }

    function handleCancelAddTask() {
        setAddingTaskToCategory(null);
    }

    function deleteAllTaskFromCategory(id, length) {
        length > 0 && setTodoAppData({
            ...todoAppData,
            taskCount: todoAppData?.taskCount - length,
            taskCategory: todoAppData?.taskCategory?.map((category) => {
                if (category.id === id) {
                    return {
                        ...category,
                        tasks: [],
                    };
                }
                else {
                    return category;
                }
            })
        })
    }

    return (
        <div className="px-4 bg-black text-gray-300 pb-5 h-screen">
            {/* Mobile View */}
            <div className="md:hidden">
                <div className="flex border justify-around p-2 gap-2 rounded-lg">
                    {todoAppData?.taskCategory?.map((category) => (
                        <button
                            key={category?.id}
                            className={`cursor-pointer p-2 w-full rounded-lg ${selectedCategory === category?.id && "bg-neutral-600"} hover:bg-neutral-800`}
                            onClick={() => setSelectedCategory(category?.id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, category?.id)}
                        >
                            {category.name} {category?.tasks?.length}
                        </button>
                    ))}
                </div>
                {
                    isMobile ? (<div className="mt-4">
                        {todoAppData?.taskCategory?.map((category) => {
                            if (category.id === selectedCategory) {
                                const IconElement = todoAppData[category?.name];
                                return (
                                    <div key={category.id}>
                                        <div className={`text-center flex justify-between md:mb-2 md:rounded rounded-t-lg bg-neutral-900 p-3 font-bold text-2xl`}>
                                            <div className={`flex items-center gap-3  ${category?.textColor}`}>
                                                <div><IconElement /></div>
                                                <div>{category?.name}</div>
                                                <div>{category?.tasks?.length}</div>
                                            </div>
                                            <div className="flex justify-end cursor-pointer items-center gap-2">
                                                <AddCircleIcon
                                                    className='text-green-500'
                                                    fontSize="large"
                                                    onClick={() => handleAddIndividualTask(category?.id)}
                                                />
                                                <DeleteSweepIcon
                                                    className='text-stone-400'
                                                    fontSize="large"
                                                    onClick={() => deleteAllTaskFromCategory(category?.id, category?.tasks?.length)}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            id={category.id}
                                            className={`flex flex-col gap-2 text-sm p-2 bg-neutral-900 flex-grow rounded-b-lg overflow-auto shrink-0`}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e, category?.id)}
                                        >
                                            <AnimatePresence>
                                                {category?.tasks?.map((task) => (
                                                    <TaskCard
                                                        key={task?.taskName}
                                                        taskData={{ task, category: category?.name, categoryId: category?.id }}
                                                    />
                                                ))}
                                                {addingTaskToCategory === category?.id && (
                                                    <NewTaskCard
                                                        categoryId={category?.id}
                                                        onCancel={handleCancelAddTask}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>) : ""
                }
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex flex-col mx-1 gap-5 md:gap-1 md:flex-row md:justify-evenly h-screen">
                {
                    todoAppData?.taskCategory?.map((data, index) => {
                        const IconElement = todoAppData[data?.name]
                        return (
                            <div
                                className={`shadow-md rounded-md p-0.5 w-full md:w-1/3 flex flex-col`}
                                key={index}
                                onDragOver={(e) => { e.preventDefault() }}
                                onDrop={(e) => handleDrop(e, data?.id)}
                            >
                                <div
                                    className={`text-center flex justify-between md:mb-2 md:rounded ${data?.tasks?.length === 0 && addingTaskToCategory !== data?.id ? "rounded-lg" : "rounded-t-lg"} bg-neutral-900 p-3 font-bold text-2xl`}
                                >
                                    <div
                                        className={`flex items-center gap-3  ${data?.textColor}`}
                                    >
                                        <div><IconElement /></div>
                                        <div>{data?.name}</div>
                                        <div>{data?.tasks?.length}</div>
                                    </div>
                                    <div
                                        className="flex justify-end cursor-pointer items-center gap-2"
                                    >
                                        <AddCircleIcon
                                            className='text-green-500'
                                            fontSize="large"
                                            onClick={() => handleAddIndividualTask(data?.id)}
                                        />
                                        <DeleteSweepIcon
                                            className='text-stone-400'
                                            fontSize="large"
                                            onClick={() => deleteAllTaskFromCategory(data?.id, data?.tasks?.length)}
                                        />
                                    </div>
                                </div>
                                <div
                                    id={data?.id}
                                    className={`flex flex-col gap-2 text-sm p-2  ${data?.tasks?.length === 0 && addingTaskToCategory !== data?.id ? 'hidden md:flex' : ''} flex-grow md:rounded ${data?.tasks?.length === 0 && addingTaskToCategory !== data?.id ? "rounded" : "rounded-b-lg"} overflow-auto shrink-0`}
                                >
                                    <AnimatePresence>
                                        {
                                            data?.tasks?.map((task, index) => {
                                                return (
                                                    <TaskCard
                                                        key={task?.taskName}
                                                        taskData={{ task, category: data?.name, categoryId: data?.id }}
                                                    />
                                                )
                                            })
                                        }
                                        {addingTaskToCategory === data?.id && (
                                            <NewTaskCard
                                                categoryId={data?.id}
                                                onCancel={handleCancelAddTask}
                                            />
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