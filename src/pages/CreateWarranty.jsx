import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { backend_uri } from "../constants";
import { useSearchParams } from "react-router-dom";
import './CreateWarranty.css';

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
    const [step, setStep] = useState(1);

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

    function goToNext() {
        setStep(step + 1);
    }

    return (
            <div className={`createContainer`}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", padding: "20px" }}>Create Warranty</h2>
                {/* <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Step {step} of 3</h3> */}
                <ProgressBar animated variant="info" now={(step * 100) / 3} />

                <Form onSubmit={handleSubmit}>

                    {step === 1 && <><Form.Group controlId="productName" style={{ marginBottom: "15px" }}>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                        />
                    </Form.Group>
                        <Form.Group controlId="product" style={{ marginBottom: "15px" }}>
                            <Form.Label>Upload Product Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "product")}
                            />
                        </Form.Group></>}

                    {step === 2 && <><Form.Group controlId="purchaseDate" style={{ marginBottom: "15px" }}>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                        <Form.Group controlId="receipt" style={{ marginBottom: "15px" }}>
                            <Form.Label>Upload Receipt</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "receipt")}
                            />
                        </Form.Group></>}


                    {step === 3 && <><Form.Group controlId="warrantyDuration" style={{ marginBottom: "15px" }}>
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
                        <Form.Group controlId="warrantyCard" style={{ marginBottom: "15px" }}>
                            <Form.Label>Upload Warranty Card</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "warrantyCard")}
                            />
                        </Form.Group></>}
                    {step === 3 && <Button
                        variant="primary"
                        type="submit"
                        style={{ marginTop: "20px", width: "100%" }}
                    >Submit
                    </Button>}
                    {(step === 1 || step === 2) && <Button
                        variant="primary"
                        style={{ marginTop: "20px", width: "100%" }}
                        onClick={goToNext}
                    >Next
                    </Button>}

                </Form>
            </div>
    )
}

export default CreateWarranty;