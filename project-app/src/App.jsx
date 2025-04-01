import {BrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import Header from './pages/Header'
import {createBrowserRouter} from "react-router-dom";
import Home from './pages/Home';
import Login from "./page/Login";
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
    {path: '/header', element: <Header />},
    {path: '/', element: <Home /> },
    {path: '/login', element: <Login />}
    {path: '/Dashboard', element: <Dashboard /> }
])

function App() {
    return (
        <div id="app-container">
            <Header />
            <div id="app-content">
                <RouterProvider router={router}/>
            </div>
        </div>
    )
}

export default App
