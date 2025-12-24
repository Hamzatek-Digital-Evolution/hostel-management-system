import { useEffect, useState } from "react";
import { getAdminPayments, confirmPayment } from "../../api/admin";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/ConfirmModal";

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);

    const load = async () => {
        try {
            const res = await getAdminPayments();
            setPayments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { load(); }, []);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => async () => { });

    const doConfirm = (id) => {
        setConfirmTitle('Confirm payment');
        setConfirmMessage('Are you sure you want to mark this payment as PAID?');
        setConfirmAction(() => async () => {
            try {
                await confirmPayment(id);
                toast.success('Payment confirmed');
                await load();
            } catch (err) {
                console.error(err);
                toast.error(err?.response?.data?.message || 'Confirm failed');
            }
        });
        setConfirmOpen(true);
    };

    return (
        <>
            <div className="bg-white p-5 rounded shadow mt-6">
                <h2 className="font-semibold mb-3">Payments</h2>
                <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th>Student</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Reference</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(p => (
                                <tr key={p.id} className="border-t">
                                    <td>{p.Student?.regNumber}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.status}</td>
                                    <td>{p.reference}</td>
                                    <td>
                                        {p.status !== 'PAID' && (
                                            <button onClick={() => doConfirm(p.id)} className="text-green-600">Confirm</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmModal
                isOpen={confirmOpen}
                title={confirmTitle}
                message={confirmMessage}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={async () => { setConfirmOpen(false); await confirmAction(); }}
            />
        </>
    );
};

export default AdminPayments;
