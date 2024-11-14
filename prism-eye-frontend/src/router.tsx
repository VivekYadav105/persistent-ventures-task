import { createBrowserRouter, Navigate } from "react-router-dom";
import MainWrapper from "./wrapper/main.wrapper";
import AuthWrapper from "./wrapper/auth.wrapper";
import ScanPage from "./pages/scan/scan";
import HistorySection from "./pages/scan/history";
import HomePage from "./pages/scan/home";
import PlansPage from './pages/plans/planPage';
import Login from "./pages/auth/login";
import Signup from './pages/auth/signup';
import Verify from "./pages/auth/verify";
import Forgot from "./pages/auth/forgot";
import Reset from "./pages/auth/reset";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={'/main'} replace/>
    },
    {
        path: "/main",
        element: <MainWrapper/>,
        children: [
            {
                path: "",
                index: true,
                element: <HomePage/>
            },
            {
                path: "scan",
                element: <ScanPage/>,
            },
            {
                path: "scan/:id",
                element: <p>New scan input</p>
            },
            {
                path: "history",
                element: <HistorySection/>
            },
            {
                path: "plans",
                element: <PlansPage/>
            }
        ]
    },
    {
        path: "/auth",
        element:<AuthWrapper/>,
        children:[
            {
                path:'',
                index:true,
                element:<Navigate to={'/auth/login'} replace/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'forgot',
                element:<Forgot/>
            },
            {
                path:'signup',
                element:<Signup/>
            },
            {
                path:'verify/:token',
                element:<Verify/>
            },
            {
                path:"reset/:token",
                element:<Reset/>
            }
            
        ]
    }
]);

export default router;