import React, { useState } from 'react';
import { createEmployeeAPI } from '../API/employeeFrontApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Add Employee Page
const CreateEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [salary, setSalary] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'department':
                setDepartment(value);
                break;
            case 'role':
                setRole(value);
                break;
            case 'hireDate':
                setHireDate(value);
                break;
            case 'salary':
                setSalary(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newEmployee = {
            firstName,
            lastName,
            gender,
            email,
            phone,
            address,
            department,
            role,
            hireDate,
            salary
        };
        try {
            const response = await createEmployeeAPI(newEmployee);
            setResponseMessage('Employee created successfully!');
            window.alert('Employee created successfully!');
            navigate('/findAllEmployee');
            // Clear the form fields
            setFirstName('');
            setLastName('');
            setGender('');
            setEmail('');
            setPhone('');
            setAddress('');
            setDepartment('');
            setRole('');
            setHireDate('');
            setSalary('');
        } catch (error) {
            console.error('Error creating employee:', error);
            setResponseMessage('Error creating employee.');
        }
    };
    

    return (
        <div className="max-w mx-auto mt-10 bg-gray-200 p-5 border border-gray-300 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            <FontAwesomeIcon icon={faPlus} className='pr-2' />   
                Add New Employee
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="form-control w-full max-w-xs text-gray-500">
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleInputChange}
                            required
                            placeholder='Your firstname'
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
                            value={lastName}
                            onChange={handleInputChange}
                            required
                            placeholder='Your lastname'
                            className="input input-bordered w-full max-w-xs text-gray-100"
                        />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full max-w-xs text-gray-500">
                        Gender:
                        <select name="gender" defaultValue="Man" onChange={(e) => setGender(e.target.value)} required
                            className='select w-full max-w-xs text-gray-100'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="LGBTQA+">LGBTQA+</option>
                            <option value="Others">Others</option>
                            <option value="Undefined">Undefined</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label className="form-control w-full max-w-xs text-gray-500">
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            required
                            placeholder='Your email'
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
                            value={phone}
                            maxLength={10}
                            minLength={10}
                            onChange={handleInputChange}
                            required
                            placeholder='Your phone number'
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
                            value={address}
                            onChange={handleInputChange}
                            required
                            placeholder='Your Address'
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
                            value={department}
                            onChange={handleInputChange}
                            required
                            placeholder='Your Department'
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
                            value={role}
                            onChange={handleInputChange}
                            required
                            placeholder='Your role'
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
                            value={hireDate}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full max-w-xs text-gray-100"
                        />
                    </label>
                </div>
                <div>
                    <label className="form-control w-full max-w-xs text-gray-500">
                        Salary:
                        <input
                            type="number"
                            name="salary"
                            value={salary}
                            onChange={handleInputChange}
                            required
                            placeholder='Your Salary'
                            className="input input-bordered w-full max-w-xs text-gray-100"
                        />
                    </label>
                </div>
                <div className="md:col-span-2 flex justify-center">
                    <button 
                        type="submit" 
                        className="btn btn-wide btn-primary"
                    >
                        Create
                    </button>
                </div>
            </form>
            {responseMessage && <p className="mt-4 text-center text-sm text-gray-600">{responseMessage}</p>}
        </div>
    );
};

export default CreateEmployee;