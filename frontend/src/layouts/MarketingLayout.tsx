import { Outlet } from 'react-router-dom';
import Nav from '../components/common/Nav';

export default function MarketingLayout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    );
}