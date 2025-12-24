const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-lg shadow p-5">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {value}
        </h2>
    </div>
);
export default StatCard;