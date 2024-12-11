import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';

const TicketDisplay = ({client, isConnected}) => {
    const [bufferSize, setBufferSize] = useState(0);

    useEffect(() => {
        const fetchQueueSize = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/system/getQueueSize');
                if (response.ok) {
                    const size = await response.json();
                    setBufferSize(size.data);
                } else {
                    console.error('Failed to fetch queue size');
                    alert('Failed to fetch queue size');          
                }
            } catch (error) {
                console.error('Error fetching queue size:', error);
                alert(error);   
            }
        };

        // Start polling every second
        const interval = setInterval(fetchQueueSize, 1000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <Box sx={{ textAlign: 'center', marginTop: 2, border: '1px solid #ccc' }}>
            <Typography variant="h6">Total Tickets Availability - {bufferSize}</Typography>
        </Box>
    );
    
};


export default TicketDisplay;