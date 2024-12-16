import React, { useEffect, useState } from 'react';
import { findAllEmployeeAPI, findEmployeeAPI, deleteEmployeeAPI } from '../API/employeeFrontApi';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faTrashCan, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Dashboard Page
const FindAllEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);
    const [field, setField] = useState(''); // State for selected field
    const [term, setTerm] = useState(''); // State for search term
    const [results, setResults] = useState([]); // State for search results

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
    
        try {
            let response;
            if (!field || !term) {
                response = await findAllEmployeeAPI();
                fetchData()
            } else {
                response = await axios.get(`http://localhost:9095/search/${field}/${term}`);
            }
            
            const data = response?.data || [];
            setResults(data);
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch search results.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        if (!field || !term) {
            fetchData();
        }
    }, [refresh, field, term]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            let employeeData;
            if (id) {
                employeeData = await findEmployeeAPI(id);
                setEmployees(employeeData ? [employeeData] : []);
            } else {
                employeeData = await findAllEmployeeAPI();
                setEmployees(employeeData);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployeeAPI(id);
                setRefresh(prev => !prev);
            } catch (error) {
                console.error('Error deleting employee:', error);
                setError('Failed to delete employee.');
            }
        }
    };

    const handleExportPDF = async () => {
        try {
            const response = await axios.get('http://localhost:9095/pdf', {
                responseType: 'blob', // Important
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'employees.pdf'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting PDF', error);
        }
    };

    const handleExportExcel = async () => {
        try {
            const response = await axios.get('http://localhost:9095/excel', {
                responseType: 'blob', // Important
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'employees.xlsx'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting Excel', error);
        }
    };

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="px-20 py-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
                <FontAwesomeIcon icon={faUserGroup} className='pr-2'/>
                All Employees
            </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Field:
                    <select value={field} onChange={(e) => setField(e.target.value)} className='select select-bordered text-gray-300 ml-4 mb-4'>
                        <option value="">Select Field</option>
                        <option value="id">ID</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="email">Email</option>
                        <option value="gender">Gender</option>
                        <option value="phone">Phone</option>
                        <option value="address">Address</option>
                        <option value="department">Department</option>
                        <option value="role">Role</option>
                        <option value="hireDate">Hire Date</option>
                        <option value="salary">Salary</option>
                    </select>
                </label>
                <label className="input input-bordered flex items-center w-80 mb-4">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search Term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        aria-label="Search Term"
                    />
                    <button type="submit" className="btn btn-ghost text-white rounded-md" aria-label="Search">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </label>
            </form>

            {loading ? (
                <div className="flex items-center justify-center">
                    <span className="loading loading-spinner text-secondary size-36 flex items-center justify-center"></span>
                </div>
            ) : error ? (
                <div role="alert" className="alert alert-error flex justify-center">
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
            ) : employees && employees.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                                <th className="col-span-2 text-center px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-500">
                            {currentEmployees.map(employee => (
                                <tr key={employee.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.id}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{`${employee.firstName} ${employee.lastName}`}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{`${employee.gender}`}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.email}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.phone}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.address}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.department}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.role}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{employee.hireDate}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">฿{employee.salary}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => handleDelete(employee.id)}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </button>
                                        <Link to={`/updateDetail/${employee.id}`} className="btn btn-ghost">
                                            <FontAwesomeIcon icon={faEdit} className='text-primary'/>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <div>
                            Showing {indexOfFirstEmployee + 1} to {Math.min(indexOfLastEmployee, employees.length)} of {employees.length} employees
                        </div>
                        <div className="flex space-x-2">
                            {[...Array(Math.ceil(employees.length / employeesPerPage)).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    onClick={() => paginate(number + 1)}
                                    className={`btn ${currentPage === number + 1 ? 'btn-active' : 'btn-ghost'}`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className='btn btn-primary text-white rounded-md end' onClick={handleExportExcel}>Export Excel</button>
                        <button className='btn btn-primary text-white rounded-md end ml-4' onClick={handleExportPDF}>Export PDF</button>
                    </div>
                </div>
            ) : (
                <div role="alert" className="alert alert-error flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>No Employee Exists Here...</span>
                </div>
            )}
        </div>
    );
};

export default FindAllEmployee;
