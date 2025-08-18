import { defaultData } from "../Contexts/GlobalContexts";

export function writeDataInStorage(todoAppData) {
    const { allComponents, ...restData } = todoAppData;
    localStorage.setItem("taskData", JSON.stringify(restData));
}

export function convertDataToDefault() {
    localStorage.setItem("taskData", JSON.stringify(defaultData))
}