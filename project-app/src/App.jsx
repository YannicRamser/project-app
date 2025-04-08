import {BrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import Header from './pages/Header'
import {createBrowserRouter} from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard'
import Corso, {loader} from "./pages/Corso.jsx";


const router = createBrowserRouter([
    {path: '/', element: <Home />, loader: loader },
    {path: '/login', element: <Login />},
    {path: '/Dashboard', element: <Dashboard /> },
    {path: '/corso/:corsoId', element: <Corso />, loader: loader }
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