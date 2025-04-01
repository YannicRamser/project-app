import {createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import './App.css'
import {createBrowserRouter} from "react-router-dom";
import Login from "./page/Login";

function App() {
    const routeDefinitions = createRoutesFromElements(
        <Route>
            <Route path="/" element={<Navigate to="/Login"/>} />
            <Route path="/Login" element={<Login />} />
        </Route>
    )

    return (
            <RouterProvider router={createBrowserRouter(routeDefinitions)}/>
    );

        // const [count, setCount] = useState(0)
        //
        // return (
        //   <>
        //     <div>
        //       <a href="https://vite.dev" target="_blank">
        //         <img src={viteLogo} className="logo" alt="Vite logo" />
        //       </a>
        //       <a href="https://react.dev" target="_blank">
        //         <img src={reactLogo} className="logo react" alt="React logo" />
        //       </a>
        //     </div>
        //     <h1>Vite + React</h1>
        //     <div className="card">
        //       <button onClick={() => setCount((count) => count + 1)}>
        //         count is {count}
        //       </button>
        //       <p>
        //         Edit <code>src/App.jsx</code> and save to test HMR
        //       </p>
        //     </div>
        //     <p className="read-the-docs">
        //       Click on the Vite and React logos to learn more
        //     </p>
        //   </>
        // )
}
export default App

