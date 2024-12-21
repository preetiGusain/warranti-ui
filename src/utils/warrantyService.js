import axios from "axios";
import { backend_uri } from "../constants";

const getToken = async () => {
    let token = localStorage.getItem('token');
    if (token) return token;
}

const getWarranty = async (id, setWarranty) => {
    try {
        let token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
        const response = await axios.get(
            `${backend_uri}/warranty/${id}`,
            {
                withCredentials: true,
                headers: headers
            }
        );
        setWarranty(response.data.warranty);
    } catch (error) {
        console.error("Error fetching warranty:", error);
    }
}

const getWarranties = async (setWarranties) => {
    try {
        let token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        }

        const response = await axios.get(
            `${backend_uri}/warranty/`,
            {
                withCredentials: true,
                headers: headers
            }
        );
        setWarranties(response.data.warranties);
    } catch (error) {
        console.error("Error fetching warranties:", error);
    }
};

const createWarranty = async (formData, successFunction) => {
    try {
        let token = await getToken();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        }
        const response = await axios.post(
            `${backend_uri}/warranty/create`,
            formData,
            { withCredentials: true, headers: headers }
        );
        if (response.status == 200) {
            console.log("Warranty created successfully:", response.data);
            successFunction(response.data);
        }
    } catch (error) {
        console.error("Error creating warranty:", error);
    }
};

const deleteWarranty = async (id, successFunction) => {
    try {
        let token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
        const response = await axios.delete(
            `${backend_uri}/warranty/${id}`,
            {
                withCredentials: true,
                headers: headers
            }
        );
        if (response.status == 200) {
            console.log("Warranty deleted successfully:", response.data);
            successFunction(response.data);
        }
    } catch (error) {
        console.error("Error deleting warranty:", error);
    }
};

const fetchUser = async (setUser) => {
    try {
        let token = await getToken();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        }

        const response = await axios.get(
            `${backend_uri}/user/profile`,
            {
                withCredentials: true,
                headers: headers
            }
        );
        setUser(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

const logoutUser = async () => {
    let token = await getToken();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    }
    axios
        .get(`${backend_uri}/auth/logout`, {
            withCredentials: true,
            headers: headers
        })
};

export {
    getWarranty,
    getWarranties,
    deleteWarranty,
    createWarranty,
    fetchUser,
    logoutUser
}

