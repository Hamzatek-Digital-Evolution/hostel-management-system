import api from "./axios";

export const getStudentDashboard = () => api.get("/student/dashboard");

export const getStudentBookings = () => api.get("/student/bookings");

export const getAllocationStatus = () => api.get("/allocations/status/student");

export const getAllocationStatusByPayment = (studentId) =>
  api.get(`/allocations/status/payment?studentId=${studentId}`);

export const getAllAllocationStatuses = () =>
  api.get("/allocations/status/all");
export const fetchEligibleHostels = () => api.get("/student/eligible-hostels");
export const initiatePayment = (data) => api.post("/payments", data);
