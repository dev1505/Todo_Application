import { useContext } from "react";
import { defaultData, GlobalContext } from "../Contexts/GlobalContexts";
import { convertDataToDefault } from "./CommonFunctions";

export default function AddTask() {

    const { setTodoAppData, todoAppData } = useContext(GlobalContext);

    function handleTaskAdding(e) {
        e.preventDefault();
        const inputValue = document?.getElementById("addTask")?.value;
        if (inputValue === "") {
            alert("Please Enter Task!!!");
        }
        else {
            const newTask = todoAppData?.taskCategory?.map((data) => {
                if (data?.id === 1 && data?.name === "Open") {
                    return { ...data, tasks: [{ taskName: inputValue, addedTime: new Date().toLocaleTimeString() }, ...data?.tasks,] }
                }
                else {
                    return data;
                }
            })

            const newData = {
                ...todoAppData,
                taskCategory: newTask,
                taskCount: todoAppData?.taskCount + 1,
            }

            setTodoAppData(newData)
        }
    }

    function removeAllTasksFromStorage() {
        setTodoAppData({ ...todoAppData, ...defaultData })
        convertDataToDefault();
    }

    return (
        <div>
            <form onSubmit={(e) => handleTaskAdding(e)}>
                <div
                    className="flex justify-evenly p-5 flex-col md:flex-row gap-3 bg-black text-gray-300"
                >
                    <div>
                        Enter Task Name - {" "}
                        <input
                            type="text"
                            className="border-1 rounded p-1"
                            placeholder="Please enter Task"
                            id="addTask"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="rounded border-1 p-1"
                        >
                            Add Task
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="rounded border-1 p-1"
                            onClick={removeAllTasksFromStorage}
                        >
                            Remove All Tasks
                        </button>
                    </div>
                </div>
            </form>
        </div >
    )
}
