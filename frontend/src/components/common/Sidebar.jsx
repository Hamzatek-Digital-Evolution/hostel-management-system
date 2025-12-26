import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user, logout, isAdmin, isStudent } = useAuth();

    return (
        <aside className="w-64 bg-white border-r min-h-screen p-4">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Hostel Management</h1>
                {user && <div className="text-sm text-gray-600 mt-1">{user.firstName} {user.lastName}</div>}
            </div>

            <nav className="flex flex-col gap-2">
                {isStudent && (
                    <>
                        <Link to="/student/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                        <Link to="/student/book-room" className="text-gray-700 hover:text-blue-600">Book Room</Link>
                    </>
                )}

                {isAdmin && (
                    <>
                        <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                        <Link to="/admin/hostels" className="text-gray-700 hover:text-blue-600">Hostels</Link>
                        <Link to="/admin/rooms" className="text-gray-700 hover:text-blue-600">Rooms</Link>
                        <Link to="/admin/allocations" className="text-gray-700 hover:text-blue-600">Allocations</Link>
                        <Link to="/admin/students" className="text-gray-700 hover:text-blue-600">Students</Link>
                        <Link to="/admin/payments" className="text-gray-700 hover:text-blue-600">Payments</Link>
                    </>
                )}

                <div className="mt-4">
                    <button onClick={logout} className="text-sm text-red-600 cursor-pointer">Logout</button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
