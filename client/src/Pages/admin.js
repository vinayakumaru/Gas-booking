import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function SimpleContainer() {
    const [Tables, setTables] = useState([]);
    const [buttonSelected, setbuttonSelected] = useState(0);
    const [dataTable, setdataTable] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/getAllTables")
            .then((res) => {
                console.log(res.data);
                setTables(res.data);
                axios.post("http://localhost:4000/api/getTable", { table: res.data[buttonSelected].Tables_in_gasbooking })
                    .then((res) => {
                        console.log(res.data);
                        setdataTable(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleTable = (table) => {
        axios.post("http://localhost:4000/api/getTable", { table })
            .then((res) => {
                console.log(res.data);
                setdataTable(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div style={{ height: "100vh", display: "flex", gap: "3px" }}>
            <Box
                sx={{
                    display: "flex",
                    minWidth: "200px",
                    padding: "10px",
                    margin: "5px",
                    marginRight: "3px",
                    borderRadius: "10px",
                    alignItems: "center",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    boxShadow: "8px 8px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19)"
                }}
            >
                <Typography variant="h6" component="h2">
                    <b>Admin Dashboard</b>
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        padding: "10px",
                        flexDirection: "column",
                        marginTop: "10px",
                        borderRadius: "10px",
                        flexGrow: 1,
                        bgcolor: "grey.200",
                        gap: "10px",
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Tables
                    </Typography>
                    {Tables.map(({ Tables_in_gasbooking }, index) =>
                    (<Button
                        variant={buttonSelected === index ? "contained" : "outlined"}
                        onClick={() => {
                            setbuttonSelected(index);
                            handleTable(Tables_in_gasbooking);
                        }}
                    >{Tables_in_gasbooking}</Button>)
                    )}
                </Box>
            </Box>
            <Box sx={{
                flexGrow: 1,
                padding: "10px",
                margin: "5px",
                marginLeft: "0px",
                borderRadius: "10px",
                bgcolor: "background.paper",
                boxShadow: "8px 8px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19)"
            }}>
                <div className='container' style={{ display: "flex", justifyContent: "center", marginTop: "45px" }}>
                    <TableContainer sx={{ maxWidth: 950, maxHeight: "85vh" }} component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {dataTable.length > 0 ? Object.keys(dataTable[0]).map((key) => (
                                        <StyledTableCell>{key}</StyledTableCell>
                                    )) : null}  
                                    <StyledTableCell align="right"  sx={{ paddingRight: "25px" }}>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataTable.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        {Object.keys(row).map((key) => (
                                            <StyledTableCell>
                                                {row[key]}
                                            </StyledTableCell>
                                        ))}
                                        <StyledTableCell align="right">
                                            <div style={{ display: "flex", gap: "10px" , justifyContent: "right"}}>
                                                <IconButton aria-label="delete" sx={{ marginTop: "6px" }}>
                                                    <EditIcon sx={{ color: "#1021DF" }} />
                                                </IconButton>
                                                <IconButton aria-label="edit" sx={{ marginTop: "6px" }}>
                                                    <DeleteIcon sx={{ color: "#FF0000" }} />
                                                </IconButton>
                                            </div>
                                            
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </div>
    );
}
