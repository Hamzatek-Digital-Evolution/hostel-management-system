const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-lg shadow p-5">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {value}
        </h2>
    </div>
);

const StudentStats = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
                title="Allocation Status"
                value={data.allocationStatus}
            />
            <StatCard
                title="Hostel"
                value={data.room ? data.room.hostel : "N/A"}
            />
            <StatCard
                title="Payment Status"
                value={data.payment.status}
            />
        </div>
    );
};

export default StudentStats;
