import axios from "axios"

export const findEmployeeAPI = async(id) => {
    try{
        const response = await axios.get(`http://localhost:9095/findEmployee/${id}`)
        return response.data   
    }
    catch(error){
        throw new Error('Error finding employee', error)
    }
}

export const findAllEmployeeAPI = async() => {
    
    try{
        const response = await axios.get('http://localhost:9095/findAllEmployees')
        return response.data
    }
    catch(error){
        throw new Error('Dashboard Error', error)
    }
}

export const createEmployeeAPI = async (newEmployee) => {
    try{
        const response = await axios.post('http://localhost:9095/createEmployee', newEmployee);
        return response.data;
    } catch (error) {
        throw new Error('Error creating employee:', error);
    }
}

export const updateDetailAPI = async(id) => {
    try {
        const response = await axios.put(`http://localhost:9095/updateEmployee/${id}`)
        return response.data
    }
    catch (error) {
        throw new Error('Error Update Employee:', error);
    }
}

export const deleteEmployeeAPI = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:9095/deleteEmployee/${id}`)
        return response.data
    }
    catch(error){
        throw new Error('Error Delete Employee:', error);
    }
}

export const filterSearchAPI = async(field,term) => {
    const response = await axios.get(`http://localhost:9095/search/${field}/${term}`)
    return response.data
}


