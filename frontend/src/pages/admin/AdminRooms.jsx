import { useEffect, useState } from "react";
import { getAdminRooms, getAdminHostels, createRoom, deleteRoom } from "../../api/admin";

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [hostels, setHostels] = useState([]);
    const [roomNumber, setRoomNumber] = useState("");
    const [capacity, setCapacity] = useState(2);
    const [hostelId, setHostelId] = useState("");

    const load = async () => {
        const r = await getAdminRooms();
        const h = await getAdminHostels();
        setRooms(r.data);
        setHostels(h.data);
    };

    useEffect(() => {
        load();
    }, []);

    const submit = async () => {
        await createRoom({ roomNumber, capacity, hostelId });
        setRoomNumber("");
        setCapacity(2);
        setHostelId("");
        await load();
    };

    return (
        <div className="bg-white p-5 rounded shadow">
            <h2 className="font-semibold mb-3">Manage Rooms</h2>

            <div className="grid grid-cols-4 gap-2 mb-4">
                <input
                    className="border p-2"
                    placeholder="Room #"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                />
                <input
                    type="number"
                    className="border p-2"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                />
                <select className="border p-2" value={hostelId} onChange={(e) => setHostelId(e.target.value)}>
                    <option value="">Select hostel</option>
                    {hostels.map((h) => (
                        <option key={h.id} value={h.id}>
                            {h.name}
                        </option>
                    ))}
                </select>
                <button onClick={submit} className="bg-blue-600 text-white px-3 rounded">
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {rooms.map((r) => (
                    <li key={r.id} className="flex justify-between">
                        <span>
                            {r.roomNumber} — {r.Hostel?.name}
                        </span>
                        <button onClick={() => deleteRoom(r.id).then(load)} className="text-red-600">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminRooms;
