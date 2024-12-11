import React, { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
import axios from "axios";
import { backend_uri } from "../constants";
import { useSearchParams } from "react-router-dom";

function FileUpload(props) {
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has('token')) {
            setToken(searchParams.get('token'));
            localStorage.setItem('token', searchParams.get('token'));
        } else {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    async function submit() {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        }
        const response = await axios.post(
            `${backend_uri}/warranty/image
            }`,
            formData,
            { withCredentials: true, headers: headers }
          );
    }
    return (
        <form>
            <label for="upload"> Upload an image </label>
            <input name="photo" type="file" id="upload" accept="image/*" onChange={handleInputChange} />
            <Button onClick={() => {console.log(formData); submit();}}>Log to console</Button>
        </form>
    )
}

export default FileUpload;
