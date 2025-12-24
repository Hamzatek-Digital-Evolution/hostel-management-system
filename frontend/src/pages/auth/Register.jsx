import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        regNo: '',
        gender: 'Male',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('/auth/register', form);
            navigate('/login');
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {error && (
                    <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
                )}

                <input
                    name="name"
                    placeholder="Full Name"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

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
                    name="regNo"
                    placeholder="Registration Number"
                    className="w-full mb-3 p-2 border rounded"
                    value={form.regNo}
                    onChange={handleChange}
                    required
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
