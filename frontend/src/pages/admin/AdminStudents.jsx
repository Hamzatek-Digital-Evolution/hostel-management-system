import { useEffect, useState } from "react";
import { getAdminStudents } from "../../api/admin";
import { getAdminHostels } from "../../api/admin";
import { fetchAvailableRooms } from "../../api/booking";
import { allocateRoomAdmin } from "../../api/admin";
import { toast } from "react-toastify";

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);

    // allocation UI state
    const [allocatingFor, setAllocatingFor] = useState(null);
    const [selectedHostel, setSelectedHostel] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");

    const load = async () => {
        setLoading(true);
        try {
            const s = await getAdminStudents();
            setStudents(s.data);
            const h = await getAdminHostels();
            setHostels(h.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const startAllocate = (student) => {
        setAllocatingFor(student);
        setSelectedHostel("");
        setRooms([]);
        setSelectedRoom("");
    };

    const loadRooms = async (hostelId) => {
        setRooms([]);
        setSelectedRoom("");
        if (!hostelId) return;
        try {
            const res = await fetchAvailableRooms(hostelId);
            setRooms(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const submitAllocate = async () => {
        if (!allocatingFor || !selectedRoom) return toast.error("Select a room");
        try {
            await allocateRoomAdmin({ studentId: allocatingFor.student.id, roomId: selectedRoom });
            toast.success("Allocated successfully");
            setAllocatingFor(null);
            await load();
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Allocation failed");
        }
    };



    if (loading) return <div className="p-4">Loading students...</div>;

    return (
        <div className="bg-white p-5 rounded shadow">
            <h2 className="font-semibold mb-3">Students</h2>

            <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th>Reg No</th>
                            <th>Name</th>
                            <th>Total Paid</th>
                            <th>Pending</th>
                            <th>Allocation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.student.id} className="border-t">
                                <td className="py-2">{s.student.regNumber}</td>
                                <td>{s.student.firstName} {s.student.lastName}</td>
                                <td>{s.totalPaid}</td>
                                <td>{s.totalPending}</td>
                                <td>{s.allocation ? s.allocation.Room?.roomNumber : 'None'}</td>
                                <td>
                                    <button onClick={() => startAllocate(s)} className="text-blue-600">Allocate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {allocatingFor && (
                <div className="mt-4 border-t pt-4">
                    <h3 className="font-semibold mb-2">Allocate room for {allocatingFor.student.regNumber}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <select value={selectedHostel} onChange={(e) => { setSelectedHostel(e.target.value); loadRooms(e.target.value); }} className="border p-2">
                            <option value="">Select hostel</option>
                            {hostels.map(h => <option key={h.id} value={h.id}>{h.name} ({h.gender})</option>)}
                        </select>

                        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="border p-2">
                            <option value="">Select room</option>
                            {rooms.map(r => <option key={r.id} value={r.id}>Room {r.roomNumber} (cap {r.capacity} — occupied {r.occupied})</option>)}
                        </select>

                        <div>
                            <button onClick={submitAllocate} className="bg-green-600 text-white px-4 py-2 rounded">Allocate</button>
                            <button onClick={() => setAllocatingFor(null)} className="ml-2 px-4 py-2 border rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminStudents;
