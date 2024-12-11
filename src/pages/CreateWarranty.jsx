import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { backend_uri } from "../constants";
import { useSearchParams } from "react-router-dom";

function CreateWarranty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: "",
        warrantyDuration: "",
        warrantyDurationUnit: "Month",
        purchaseDate: "",
        warrantyCard: null,
        receipt: null,
        product: null
    });

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
        const { name, value, type } = event.target;
        if (type === "select-one") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    function handleFileChange(event, field) {
        setFormData((prevData) => ({
            ...prevData,
            [field]: event.target.files[0],
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("Form Data: ", formData);

        const warranty = new FormData();
        warranty.append("productName", formData.productName);
        warranty.append("warrantyDuration", formData.warrantyDuration);
        warranty.append("warrantyDurationUnit", formData.warrantyDurationUnit);
        warranty.append("purchaseDate", formData.purchaseDate);

        //adding images
        if (formData.warrantyCard) warranty.append("warrantyCard", formData.warrantyCard);
        if (formData.receipt) warranty.append("receipt", formData.receipt);
        if (formData.product) warranty.append("product", formData.warranty);

        try {
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': token,
            }
            const response = await axios.post(
                `${backend_uri}/warranty/create`,
                formData,
                { withCredentials: true, headers: headers }
            );

            setFormData({
                productName: "",
                warrantyDuration: "",
                warrantyDurationUnit: "",
                purchaseDate: "",
                warrantyCard: null,
                receipt: null,
                product: null
            })
            alert("Warranty created successfully.");
            if (response.status === 200) {
                console.log("You are going to home page");
                navigate("/home");
            }
        } catch (error) {
            console.error("Error occurred while creating warranty", error);
            alert("Failed to create warranty.");
        }
    }

    return (
        <div style={{
            padding: "20px", maxWidth: "600px", margin: "auto", border: "1px solid #ddd", borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", height: "100vh", display: "flex", flexDirection: "column"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Warranty</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="productName" style={{ marginBottom: "15px" }}>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                    />
                </Form.Group>

                <Form.Group controlId="warrantyDuration" style={{ marginBottom: "15px" }}>
                    <Form.Label>Warranty Duration</Form.Label>
                    <Form.Control
                        type="number"
                        name="warrantyDuration"
                        value={formData.warrantyDuration}
                        onChange={handleInputChange}
                        placeholder="Enter warranty duration"
                    />
                </Form.Group>

                <Form.Group controlId="warrantyDurationUnit" style={{ marginBottom: "15px" }}>
                    <Form.Label>Warranty Duration Unit</Form.Label>
                    <Form.Control as="select"
                        name="warrantyDurationUnit"
                        value={formData.warrantyDurationUnit}
                        onChange={handleInputChange}>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="purchaseDate" style={{ marginBottom: "15px" }}>
                    <Form.Label>Purchase Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/**Adding images */}
                <Form.Group controlId="warrantyCard" style={{ marginBottom: "15px" }}>
                    <Form.Label>Upload Warranty Card</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "warrantyCard")}
                    />
                </Form.Group>

                <Form.Group controlId="receipt" style={{ marginBottom: "15px" }}>
                    <Form.Label>Upload Receipt</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "receipt")}
                    />
                </Form.Group>

                <Form.Group controlId="product" style={{ marginBottom: "15px" }}>
                    <Form.Label>Upload Product Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "product")}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "20px", width: "100%" }}
                >Submit Warranty
                </Button>
            </Form>
        </div>
    )
}

export default CreateWarranty;