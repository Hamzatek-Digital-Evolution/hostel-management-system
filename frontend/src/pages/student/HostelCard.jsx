const HostelCard = ({ hostel, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(hostel)}
            className="bg-white p-5 rounded shadow cursor-pointer hover:border-blue-500 border"
        >
            <h3 className="text-lg font-semibold text-gray-800">
                {hostel.name}
            </h3>
            <p className="text-gray-500 text-sm">
                Gender: {hostel.gender}
            </p>
            <p className="text-gray-500 text-sm">
                Available Rooms: {hostel.availableRooms}
            </p>
        </div>
    );
};

export default HostelCard;
