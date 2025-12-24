import { useEffect, useState } from "react";
import { getAdminAllocations, vacateRoomAdmin } from "../../api/admin";
import ConfirmModal from "../../components/common/ConfirmModal";
import { toast } from "react-toastify";

const AdminAllocations = () => {
    const [allocations, setAllocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => async () => { });

    const load = async () => {
        setLoading(true);
        try {
            const res = await getAdminAllocations();
            setAllocations(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleVacate = (a) => {
        const studentReg = a.Student?.regNumber || a.Student?.id || 'student';
        setConfirmTitle('Vacate allocation');
        setConfirmMessage(`Vacate allocation for ${studentReg}?`);
        setConfirmAction(() => async () => {
            try {
                const studentId = a.Student?.id || a.studentId;
                await vacateRoomAdmin({ studentId });
                toast.success('Vacated successfully');
                await load();
            } catch (err) {
                console.error(err);
                toast.error(err?.response?.data?.message || 'Vacate failed');
            }
        });
        setConfirmOpen(true);
    };

    if (loading) return <div className="p-4">Loading allocations...</div>;

    return (
        <div className="bg-white p-5 rounded shadow">
            <h2 className="font-semibold mb-3">Room Allocations</h2>

            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-500">
                        <th>Student</th>
                        <th>Room</th>
                        <th>Hostel</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allocations.map((a) => (
                        <tr key={a.id} className="border-t">
                            <td>{a.Student?.regNumber}</td>
                            <td>{a.Room?.roomNumber}</td>
                            <td>{a.Room?.Hostel?.name}</td>
                            <td>{a.status}</td>
                            <td>
                                {a.status === 'ACTIVE' && (
                                    <button onClick={() => handleVacate(a)} className="text-red-600">Vacate</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmModal
                isOpen={confirmOpen}
                title={confirmTitle}
                message={confirmMessage}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={async () => { setConfirmOpen(false); await confirmAction(); }}
            />
        </div>
    );
};

export default AdminAllocations;
