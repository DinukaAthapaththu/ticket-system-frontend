import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const CustomerSection = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomerId, setNewCustomerId] = useState('');

    const fetchCustomers = () => {
        fetch('http://localhost:8080/api/v1/customer/list')
            .then(response => response.json())
            .then(data => setCustomers(data.data));
    };

    const addCustomer = () => {
        fetch(`http://localhost:8080/api/v1/customer/add?customerId=${newCustomerId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok) {
                setNewCustomerId('');
                fetchCustomers();
            }
        });
    };

    const removeCustomer = (id) => {
        fetch(`http://localhost:8080/api/v1/customer/remove?customerId=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok) {
                fetchCustomers();
            }
        });
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <Box sx={{border: '1px solid #ccc', padding: 2, maxWidth: 1200, margin: '0 auto', marginTop: 2 }}>
            <Typography variant="h5" align="center">Customer Details</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.customerId}>
                            <TableCell align="center">{customer.customerId}</TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" color="error" onClick={() => removeCustomer(customer.customerId)}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <TextField
                    label="Customer ID"
                    value={newCustomerId}
                    onChange={(e) => setNewCustomerId(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={addCustomer}>
                    Add Customer
                </Button>
            </Box>
        </Box>
    );
};

export default CustomerSection;