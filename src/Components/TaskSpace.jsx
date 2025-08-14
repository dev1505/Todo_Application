import { useContext } from "react";
import { GlobalContext } from "../Contexts/GlobalContexts";

export default function TaskSpace() {
    const { todoAppData } = useContext(GlobalContext);

    return (
        <div className="bg-red-300 py-6 px-2">
            <div className="flex flex-col mx-2 h-screen gap-5 md:flex-row md:justify-evenly">
                {
                    todoAppData?.taskCategory?.map((data, index) => (
                        <div
                            className="bg-white shadow-md rounded-md p-4 w-full md:w-1/3 flex flex-col h-1/3 md:h-screen"
                            key={index}
                        >
                            <div className="text-lg font-semibold text-center mb-2">
                                {data?.name}
                            </div>
                            <div className="text-sm text-center bg-pink-100 flex-grow flex items-center justify-center rounded">
                                {data?.description || "No description"}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
