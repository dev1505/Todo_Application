import { useContext } from "react";
import { GlobalContext } from "./Contexts/GlobalContexts";

function App() {

  const { todoAppData, setTodoAppData } = useContext(GlobalContext);
  return (
    <>
      <div>
        {
          todoAppData?.allComponents?.map((data, index) => {
            const Component = data?.component;
            return (
              <div
                key={index}
              >
                <Component />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
