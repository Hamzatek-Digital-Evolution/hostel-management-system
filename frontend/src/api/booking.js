import api from "./axios";

export const fetchHostels = (gender) => {
  const qs = gender ? `?gender=${encodeURIComponent(gender)}` : "";
  return api.get(`/hostels${qs}`);
};

export const fetchAvailableRooms = (hostelId) =>
  api.get(`/hostels/${hostelId}/rooms?available=true`);

export const bookRoom = (roomId) => api.post("/allocations/book", { roomId });
