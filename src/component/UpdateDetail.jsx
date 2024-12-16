import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Update Employee Detail Page
const UpdateDetail = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const fetchEmployeeData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9095/findEmployee/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await fetchEmployeeData(id);
                setEmployee(data);
            } catch (error) {
                console.error('Error fetching employee:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:9095/updateEmployee/${employee.id}`, employee);
            window.alert('Update Employee Information successfully!');
            navigate('/findAllEmployee'); // Navigate to employee list page after update
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <span className="loading loading-spinner text-secondary size-36 flex items-center justify-center"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert" className="alert alert-error text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline-block align-middle mr-2 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <span className="inline-block align-middle">{error}</span>
            </div>
        );
    }

    return (
        <div className="max-w mx-auto mt-10 bg-gray-200 p-5 border border-gray-300 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                <FontAwesomeIcon icon={faEdit} className='pr-2'/>
                Edit Information
            </h2>
            <h3 className="text-xl font-bold mb-6 text-center text-gray-800">ID: {employee.id}</h3>
            {employee && (
                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={employee.firstName}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={employee.lastName}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Gender:
                            <select 
                                name="gender" 
                                onChange={handleChange} 
                                value={employee.gender} 
                                required
                                className='select w-full max-w-xs text-gray-100'
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="LGBTQA+">LGBTQA+</option>
                                <option value="Others">Others</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Phone Number:
                            <input
                                type="text"
                                name="phone"
                                minLength={10}
                                maxLength={10}
                                value={employee.phone}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={employee.address}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Department:
                            <input
                                type="text"
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Role:
                            <input
                                type="text"
                                name="role"
                                value={employee.role}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Hire Date:
                            <input
                                type="date"
                                name="hireDate"
                                value={employee.hireDate}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="form-control w-full max-w-xs text-gray-500">
                            Salary:
                            <input
                                type="text"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full max-w-xs text-gray-100"
                            />
                        </label>
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button 
                            type="submit" 
                            className="btn btn-wide btn-primary"
                        >
                            Save Update
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateDetail;
