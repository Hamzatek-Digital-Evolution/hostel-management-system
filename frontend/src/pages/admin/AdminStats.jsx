const Stat = ({ label, value }) => (
    <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">{label}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
    </div>
);

const AdminStats = ({ stats }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Hostels" value={stats.totalHostels} />
        <Stat label="Rooms" value={stats.totalRooms} />
        <Stat label="Allocated Rooms" value={stats.totalAllocations} />
        <Stat label="Available Rooms" value={stats.availableRooms} />
    </div>
);

export default AdminStats;
