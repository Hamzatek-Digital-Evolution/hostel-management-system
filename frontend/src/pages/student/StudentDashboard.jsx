import { useEffect, useState } from "react";
import { getAllocationStatus } from "../../api/student";
import StudentStats from "./StudentStats";
import StudentRoomCard from "./StudentRoomCard";
import StudentActions from "./StudentActions";

const StudentDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllocationStatus()
            .then((res) => {
                // backend returns { allocation, payment }
                const { allocation, payment } = res.data || {};

                const allocationStatus = allocation ? "ALLOCATED" : "NOT_ALLOCATED";

                let room = null;
                if (allocation && allocation.Room) {
                    const r = allocation.Room;
                    room = {
                        roomNumber: r.roomNumber,
                        hostel: r.Hostel ? r.Hostel.name : r.hostelId,
                        bedSpace: r.capacity,
                        gender: r.Hostel ? r.Hostel.gender : null,
                    };
                }

                const paymentData = payment || { status: "UNPAID" };

                setData({ allocationStatus, room, payment: paymentData });
            })
            .catch((err) => {
                console.error("Failed to load allocation status:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-6">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Student Dashboard
                </h1>
                <p className="text-gray-500">
                    Overview of your hostel allocation
                </p>
            </div>

            <StudentStats data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                    <StudentRoomCard data={data} />
                </div>
                <div>
                    <StudentActions data={data} />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
