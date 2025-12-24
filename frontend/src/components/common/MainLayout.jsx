import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
