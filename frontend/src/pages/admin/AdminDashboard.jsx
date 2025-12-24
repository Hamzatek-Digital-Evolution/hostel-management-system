import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/admin";
import AdminStats from "./AdminStats";
import AdminHostels from "./AdminHostels";
import AdminRooms from "./AdminRooms";
import AdminAllocations from "./AdminAllocations";
import AdminStudents from "./AdminStudents";
import AdminPayments from "./AdminPayments";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        getAdminDashboard().then((res) => setStats(res.data));
    }, []);

    if (!stats) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <AdminStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <AdminHostels />
                <AdminRooms />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdminAllocations />
                <AdminStudents />
            </div>

            <AdminPayments />
        </div>
    );
};

export default AdminDashboard;
