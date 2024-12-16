import axios from "axios"

export const exportPdfAPI = async () => {
    try{
        const response = await axios.get('http://localhost:9095/pdf')
        return response.data
    }
    catch(error){
        throw new Error("Cannot Export as PDF",error)
    }
}

export const exportExcelAPI= async () => {
    try{
        const response = await axios.get('http://localhost:9095/excel')
        return response.data
    }
    catch(error){
        throw new Error("Cannot Export as Excel (.xlsx)",error)
    }
}