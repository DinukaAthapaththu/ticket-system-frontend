import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';

const VendorSection = () => {
    const [vendors, setVendors] = useState([]);
    const [newVendorId, setNewVendorId] = useState('');

    const fetchVendors = () => {
        fetch('http://localhost:8080/api/v1/vendor/list')
            .then(response => response.json())
            .then(data => setVendors(data.data));
    };

    const addVendor = () => {
        fetch(`http://localhost:8080/api/v1/vendor/add?vendorId=${newVendorId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok) {
                setNewVendorId('');
                fetchVendors();
            }
        });
    };

    const removeVendor = (id) => {
        fetch(`http://localhost:8080/api/v1/vendor/remove?vendorId=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.ok) {
                fetchVendors();
            }
        });
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    return (
        <Box sx={{border: '1px solid #ccc', padding: 2, maxWidth: 1200, margin: '0 auto', marginTop: 2 }}>
            <Typography variant="h5" align="center">Vendor Details</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vendors.map((vendor) => (
                        <TableRow key={vendor.vendorId}>
                            <TableCell align="center">{vendor.vendorId}</TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" color="error" onClick={() => removeVendor(vendor.vendorId)}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <TextField
                    label="Vendor ID"
                    value={newVendorId}
                    onChange={(e) => setNewVendorId(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={addVendor}>
                    Add Vendor
                </Button>
            </Box>
        </Box>
    );
};

export default VendorSection;