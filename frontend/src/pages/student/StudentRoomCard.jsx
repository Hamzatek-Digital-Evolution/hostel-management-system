const Row = ({ label, value }) => (
    <div className="flex justify-between py-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-800">
            {value || "N/A"}
        </span>
    </div>
);

const StudentRoomCard = ({ data }) => {
    if (!data.room) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">
                    Room Details
                </h2>
                <p className="text-gray-500">
                    You have not been allocated a room yet.
                </p>
            </div>
        );
    }

    const { room } = data;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                My Room Details
            </h2>

            <Row label="Room Number" value={room.roomNumber} />
            <Row label="Hostel" value={room.hostel} />
            <Row label="Bed Space" value={room.bedSpace} />
            <Row label="Gender" value={room.gender} />
        </div>
    );
};

export default StudentRoomCard;
