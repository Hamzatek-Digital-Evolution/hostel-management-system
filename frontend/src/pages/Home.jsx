import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded shadow-lg w-full max-w-2xl p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Hostel Management System</h1>
                <p className="text-gray-600 mb-6">Welcome — please register or login to continue.</p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
                        Register
                    </Link>
                    <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Login
                    </Link>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    <p>Students: register to create your profile and make payments.</p>
                    <p>Admins: login to manage hostels, rooms and allocations.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
