import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../stores/userSlice.js'
import Sidebar from '../components/Sidebar.jsx'
import { FaBars } from 'react-icons/fa'

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column vh-100">
            <nav className="navbar navbar-light bg-white border-bottom px-3 px-md-4">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light d-md-none me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu">
                        <FaBars />
                    </button>
                    <span className="navbar-brand mb-0 h1 fw-bold">ClickNext</span>
                </div>
                <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">Logout</button>
            </nav>
            <div className="d-flex flex-grow-1 position-relative overflow-hidden">
                <Sidebar />
                <div className="flex-grow-1 p-3 p-md-4 bg-light overflow-auto w-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;