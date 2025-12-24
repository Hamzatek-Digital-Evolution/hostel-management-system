import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import StudentDashboard from '../pages/student/StudentDashboard';
import BookRoom from '../pages/student/BookRoom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminHostels from '../pages/admin/AdminHostels';
import AdminRooms from '../pages/admin/AdminRooms';
import AdminAllocations from '../pages/admin/AdminAllocations';
import AdminStudents from '../pages/admin/AdminStudents';
import AdminPayments from '../pages/admin/AdminPayments';
import MainLayout from '../components/common/MainLayout';


/* Pages (temporary placeholders) */




const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/test" element={<h1>ROUTER WORKS</h1>} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student */}
            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute role="STUDENT">
                        <MainLayout>
                            <StudentDashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/student/book-room"
                element={
                    <ProtectedRoute role="STUDENT">
                        <MainLayout>
                            <BookRoom />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            {/* Admin */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute role="ADMIN">
                        <MainLayout>
                            <AdminDashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/hostels"
                element={
                    <ProtectedRoute role="ADMIN">
                        <MainLayout>
                            <AdminHostels />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/rooms"
                element={
                    <ProtectedRoute role="ADMIN">
                        <MainLayout>
                            <AdminRooms />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/allocations"
                element={
                    <ProtectedRoute role="ADMIN">
                        <MainLayout>
                            <AdminAllocations />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/students"
                element={
                    <ProtectedRoute role="ADMIN">
                        <MainLayout>
                            <AdminStudents />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/payments"
                element={
                    <ProtectedRoute role="ADMIN">
                        <MainLayout>
                            <AdminPayments />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
