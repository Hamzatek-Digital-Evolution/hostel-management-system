import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onCancel, onSubmit, defaultAmount }) => {
    const [amount, setAmount] = useState(defaultAmount || '');
    const [reference, setReference] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded shadow-lg w-11/12 max-w-md p-6">
                <h3 className="text-lg font-semibold mb-2">Make Payment</h3>

                <div className="mb-3">
                    <label className="block text-sm text-gray-600 mb-1">Amount</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Reference</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        placeholder="Payment reference or transaction id"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
                    <button
                        onClick={() => onSubmit({ amount: Number(amount), reference })}
                        className="px-4 py-2 rounded bg-blue-600 text-white"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
