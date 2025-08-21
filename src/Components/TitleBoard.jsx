import { useContext } from 'react';
import { GlobalContext } from '../Contexts/GlobalContexts';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
export default function TitleBoard() {

    const { todoAppData, setTodoAppData } = useContext(GlobalContext);

    function deleteAllTasks() {
        todoAppData?.taskCount > 0 && setTodoAppData({
            ...todoAppData,
            taskCount: 0,
            taskCategory: todoAppData?.taskCategory?.map((category) => {
                return {
                    ...category,
                    tasks: [],
                };
            })
        })
    }

    return (
        <div className="flex justify-between p-6 text-white bg-black">
            <div className='text-2xl'>
                Todo Application
            </div>
            <div>
                <button
                    onClick={() => deleteAllTasks()}
                    className='flex gap-3 bg-red-700 p-2 rounded cursor-pointer'
                >
                    <div className='hidden md:block'>Remove All Task {todoAppData?.taskCount}</div>
                    <AutoDeleteIcon />
                </button>
            </div>
        </div>
    )
}
