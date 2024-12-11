import React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { setConfig } from '../slices/configSlice';
import { TextField, Button, Box, Grid } from '@mui/material';

const ConfigurationForm = ({systemStarted}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrivalRate: '',
        maxTicketCapacity: ''
    });
    // Load initial configuration from the backend
    useEffect(() => {
        const loadConfig = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/config/load');
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data.data);
                    dispatch(setConfig(data.data));
                } else {
                    console.error('Failed to load configuration');
                }
            } catch (error) {
                console.error('Error loading configuration:', error);
            }
        };
        loadConfig();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setConfig(formData));

        try {
            const response = await fetch('http://localhost:8080/api/v1/config/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Configuration saved successfully!');
                const loadResponse = await fetch('http://localhost:8080/api/v1/config/load');
                if (loadResponse.ok) {
                    const newData = await loadResponse.json();
                    setFormData(newData.data);
                    dispatch(setConfig(newData.data));
                }
            } else {
                alert('Failed to save configuration.');
            }
        } catch (error) {
            console.error('Error saving configuration:', error);
            alert('An error occurred while saving the configuration.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ border: '1px solid #ccc', padding: 2, maxWidth: 1200, margin: '0 auto' }}
        >
            <Grid container spacing={2}>
                <Grid item xs={2.5}>
                    <TextField
                        label="Total Tickets"
                        type="number"
                        name="totalTickets"
                        value={formData.totalTickets}
                        onChange={handleChange}
                        required
                        fullWidth
                        disabled={systemStarted}
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <TextField
                        label="Ticket Release Rate"
                        type="number"
                        name="ticketReleaseRate"
                        value={formData.ticketReleaseRate}
                        onChange={handleChange}
                        required
                        fullWidth
                        disabled={systemStarted}
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <TextField
                        label="Customer Retrieval Rate"
                        type="number"
                        name="customerRetrivalRate"
                        value={formData.customerRetrivalRate}
                        onChange={handleChange}
                        required
                        fullWidth
                        disabled={systemStarted}
                    />
                </Grid>
                <Grid item xs={2.5}>
                    <TextField
                        label="Max Ticket Capacity"
                        type="number"
                        name="maxTicketCapacity"
                        value={formData.maxTicketCapacity}
                        onChange={handleChange}
                        required
                        fullWidth
                        disabled={systemStarted}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ marginTop: 2 }}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={systemStarted}>
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ConfigurationForm;