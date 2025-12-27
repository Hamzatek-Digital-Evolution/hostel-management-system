import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ onClose, mobile }) => {
    const { user, logout, isAdmin, isStudent } = useAuth();

    return (
        <aside className={`${mobile ? '' : ''}`}>
            <div className="w-64 bg-white border-r min-h-screen p-4">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Hostel Management</h1>
                        {user && <div className="text-sm text-gray-600 mt-1">{user.firstName} {user.lastName}</div>}
                    </div>
                    {mobile && (
                        <button onClick={onClose} className="p-2 rounded-md bg-gray-100 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
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
            </div>
        </aside>
    );
};

export default Sidebar;
