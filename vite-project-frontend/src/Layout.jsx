
import { Outlet } from 'react-router-dom';
import NavBar from './elements/NavBar';

export default function Layout() {


    return (
        <>
        <NavBar/>
        <Outlet />
        </>
    )
}

