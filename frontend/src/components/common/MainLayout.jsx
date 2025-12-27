import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Desktop sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Mobile sidebar drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setMobileOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 overflow-auto cursor-pointer">
                        <Sidebar onClose={() => setMobileOpen(false)} mobile />
                    </div>
                </div>
            )}

            <main className="flex-1 p-4 md:p-6">
                {/* Topbar for mobile with hamburger */}
                <div className="md:hidden flex items-center justify-between mb-4">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 rounded-md bg-white shadow cursor-pointer"
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div />
                </div>

                {children}
            </main>
        </div>
    );
};

export default MainLayout;
