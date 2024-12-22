import axios from "axios";
import { backend_uri } from "../constants";

const getToken = async () => {
    let token = localStorage.getItem('token');
    if (token) return token;
}

const getWarranty = async (id, setLoading, sendSuccess, failureFunction) => {
    try {
        setLoading(true);
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
        setLoading(false);
        sendSuccess(response.data.warranty);
    } catch (error) {
        setLoading(false);
        failureFunction(error);
        console.error("Error fetching warranty:", error);
    }
}

const getWarranties = async (setLoading, sendSuccess) => {
    try {
        setLoading(true);
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
        setLoading(false);
        sendSuccess(response.data.warranties);
    } catch (error) {
        console.error("Error fetching warranties:", error);
        setLoading(false);
    }
};

const createWarranty = async (formData, setLoading, successFunction) => {
    try {
        setLoading(true);
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
        setLoading(false);
        if (response.status === 200) {
            console.log("Warranty created successfully:", response.data);
            successFunction(response.data);
        }
    } catch (error) {
        console.error("Error creating warranty:", error);
        setLoading(false);
    }
};

const deleteWarranty = async (id, setLoading, successFunction) => {
    try {
        setLoading(true);
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
        if (response.status === 200) {
            console.log("Warranty deleted successfully:", response.data);
            successFunction(response.data);
            setLoading(false);
        }
    } catch (error) {
        console.error("Error deleting warranty:", error);
        setLoading(false);
    }
};

const fetchUser = async (setLoading, successFunction) => {
    try {
        setLoading(true);
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
        setLoading(false);
        successFunction(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
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

