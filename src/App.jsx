import { componentData } from "./Contexts/GlobalContexts";

function App() {

  return (
    <>
      <div className="bg-black min-h-screen">
        {
          componentData?.allComponents?.map((data, index) => {
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
