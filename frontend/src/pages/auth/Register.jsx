import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        regNumber: '',
        gender: 'Male',
        phoneNumber: '',
        school: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const payload = {
                email: form.email,
                password: form.password,
                regNumber: form.regNumber,
                firstName: form.firstName,
                middleName: form.middleName,
                lastName: form.lastName,
                gender: form.gender,
                phoneNumber: form.phoneNumber,
                school: form.school,
            };

            await api.post('/auth/register', payload);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err?.response?.data || err.message);
            setError(err?.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {error && (
                    <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <input
                        name="firstName"
                        placeholder="First name"
                        className="w-full p-2 border rounded"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="middleName"
                        placeholder="Middle name"
                        className="w-full p-2 border rounded"
                        value={form.middleName}
                        onChange={handleChange}
                    />
                    <input
                        name="lastName"
                        placeholder="Last name"
                        className="w-full p-2 border rounded"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <input
                    name="regNumber"
                    placeholder="Registration Number"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.regNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    name="phoneNumber"
                    placeholder="Phone number"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.phoneNumber}
                    onChange={handleChange}
                />

                <input
                    name="school"
                    placeholder="School / Faculty"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.school}
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    className="w-full mb-4 p-2 border rounded"
                    value={form.gender}
                    onChange={handleChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Register
                </button>

                <p className="text-sm text-center mt-3">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
