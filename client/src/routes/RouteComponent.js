import React, { Suspense } from "react";
import routes from "./Routes";
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "../modules/navbar/Navbar";
import Loader from "../common/components/Loader";

const RouteComponent = () => {
    const location = useLocation();
    const isAuthenticated =  sessionStorage.getItem('isAuthenticated');
    console.log(isAuthenticated);
    return (<div>
        <Suspense fallback={<Loader/>}>
            {(location.pathname!== '/' && location.pathname !== '/signup') && <Navbar/>}
            <Routes>
                {routes.map(route => {
                    const Component = route.component;
                    return <Route key={route.id} path={route.path} exact={route.exact} element={<Component />} />
                })}
            </Routes>
        </Suspense>
    </div>)
}
export default RouteComponent;