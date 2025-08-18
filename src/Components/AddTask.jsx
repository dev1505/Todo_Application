import { useContext } from "react";
import { defaultData, GlobalContext } from "../Contexts/GlobalContexts";
import { convertDataToDefault } from "./CommonFunctions";

export default function AddTask() {

    const { setTodoAppData, todoAppData } = useContext(GlobalContext);

    function handleTaskAdding() {
        const inputValue = document?.getElementById("addTask")?.value;
        if (inputValue === "") {
            alert("Please Enter Task!!!");
        }
        else {
            const newTask = todoAppData?.taskCategory?.map((data) => {
                if (data?.id === 1 && data?.name === "Open") {
                    return { ...data, tasks: [...data?.tasks, { taskName: inputValue, addedTime: new Date().toLocaleTimeString() }] }
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
            <div
                className="flex justify-evenly p-5 flex-col md:flex-row gap-3"
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
                        type="button"
                        className="rounded border-1 p-1"
                        onClick={handleTaskAdding}
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
        </div>
    )
}
