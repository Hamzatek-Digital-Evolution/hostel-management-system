import { useEffect, useState } from "react";
import {
    getAdminHostels,
    createHostel,
    updateHostel,
    deleteHostel,
} from "../../api/admin";
import ConfirmModal from "../../components/common/ConfirmModal";
import { toast } from "react-toastify";

const AdminHostels = () => {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", gender: "Male", totalRooms: 0 });

    const load = async () => {
        setLoading(true);
        try {
            const res = await getAdminHostels();
            setHostels(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const startEdit = (h) => {
        setEditing(h.id);
        setForm({ name: h.name, gender: h.gender, totalRooms: h.totalRooms || 0 });
    };

    const resetForm = () => {
        setEditing(null);
        setForm({ name: "", gender: "Male", totalRooms: 0 });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await updateHostel(editing, form);
            } else {
                await createHostel(form);
            }
            await load();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("Failed to save hostel");
        }
    };

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => async () => { });

    const handleDelete = (id) => {
        setConfirmTitle("Delete hostel?");
        setConfirmMessage("This will permanently delete the hostel and related rooms.");
        setConfirmAction(() => async () => {
            try {
                await deleteHostel(id);
                await load();
                toast.success("Hostel deleted");
            } catch (err) {
                console.error(err);
                toast.error("Delete failed");
            }
        });
        setConfirmOpen(true);
    };

    if (loading) return <div className="p-4">Loading hostels...</div>;

    return (
        <div className="bg-white p-5 rounded shadow">
            <h2 className="font-semibold mb-3">Manage Hostels</h2>

            <div className="grid grid-cols-1 gap-4 mb-4">
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                        name="name"
                        placeholder="Hostel name"
                        className="border p-2"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                    />
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                        className="border p-2"
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <input
                        name="totalRooms"
                        type="number"
                        min={0}
                        className="border p-2"
                        value={form.totalRooms}
                        onChange={(e) => setForm((f) => ({ ...f, totalRooms: Number(e.target.value) }))}
                    />
                    <div className="md:col-span-3">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            {editing ? "Update Hostel" : "Create Hostel"}
                        </button>
                        {editing && (
                            <button type="button" onClick={resetForm} className="ml-2 px-4 py-2 border rounded">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Total Rooms</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hostels.map((h) => (
                            <tr key={h.id} className="border-t">
                                <td className="py-2">{h.name}</td>
                                <td>{h.gender}</td>
                                <td>{h.totalRooms ?? "-"}</td>
                                <td>
                                    <button onClick={() => startEdit(h)} className="text-blue-600 mr-3">Edit</button>
                                    <button onClick={() => handleDelete(h.id)} className="text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default AdminHostels;
