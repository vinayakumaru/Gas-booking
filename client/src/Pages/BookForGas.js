import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Autocomplete from "@mui/material/Autocomplete";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../Components/Navbar'
import getUserFromCache from '../Utils/getUserFromCache';
import TextField from "@mui/material/TextField";


const BookForGas = () => {
    const [gasprovider, setgasprovider] = React.useState([]);
    const [gas_type, setgas_type] = React.useState([]);
    const [selectedgastype, setselectedgastype] = React.useState("");
    const [selectedPaymentMethod, setselectedPaymentMethod] = React.useState("");
    const paymentMethod = ["Cash", "Card", "UPI", "Net Banking"];
    const handleClickOpen = () => {

        const username = getUserFromCache();
        if (selectedgastype !== "" && selectedPaymentMethod !== "") {
            axios
                .post("http://localhost:4000/api/book", {
                    gas_type: selectedgastype.gas_type,
                    payment_method: selectedPaymentMethod,
                    username: username,
                    amount: selectedgastype.price
                })
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error));
        }

    }

    useEffect(() => {

        const username = getUserFromCache();
        axios.post("http://localhost:4000/api/getGasTypesByUser", { username })
            .then((res) => {
                console.log(res.data);
                setgasprovider(res.data[0].company_name);
                setgas_type(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <Navbar />
            <div className='container' style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
                <Card sx={{ minWidth: "40vw" ,padding: "20px"}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Your Subscribed Provider : <b>{gasprovider}</b>
                        </Typography>
                        <Typography variant="h5" component="div">

                        </Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            isOptionEqualToValue={(option, value) => option.label === value.label}
                            options={gas_type.map(
                                (gas, index) => ({ label: (gas.gas_type + " (Rs." + gas.price + ")"), index: index })
                            )}
                            sx={{ width: 300, marginTop: "20px" }}
                            onChange={(_, newvalue) => {
                                setselectedgastype(gas_type[newvalue.index]);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Gas Type"
                                />
                            )}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={paymentMethod}
                            sx={{ width: 300, marginTop: "20px" }}
                            onChange={(_, newvalue) => {
                                setselectedPaymentMethod(newvalue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="select payment method"
                                />
                            )}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            sx={{
                                marginTop: "20px",
                            }}
                            onClick={handleClickOpen}
                        >
                            Book
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}


export default BookForGas;