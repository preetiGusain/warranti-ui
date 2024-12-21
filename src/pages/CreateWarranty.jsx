import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import './CreateWarranty.css';
import MainContainer from "../components/MainContainer";
import NavigationBar from "../components/NavigationBar";
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from "@mui/material";
import { createWarranty } from "../utils/warrantyService";


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
    const [step, setStep] = useState(1);


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

    function successSave(response) {
        setFormData({
            productName: "",
            warrantyDuration: "",
            warrantyDurationUnit: "",
            purchaseDate: "",
            warrantyCard: null,
            receipt: null,
            product: null
        });
        navigate("/home");
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

        await createWarranty(formData, successSave)
    }

    function goToNext() {
        setStep(step + 1);
    }


    return (
        <MainContainer>
            <NavigationBar title={"Create"}
                rightElem={
                    <IconButton
                        color="primary"
                    >
                        <CancelIcon />
                    </IconButton>
                }
            />
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
        </MainContainer>
    )
}

export default CreateWarranty;