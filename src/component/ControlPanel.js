import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Button, Box, Typography } from '@mui/material';
import ConfigurationForm from './ConfigurationForm';
import TicketDisplay from './TicketDisplay';
import CustomerSection from "./CustomerSection";
import VendorSection from "./VendorSection";

const ControlPanel = () => {
    const [systemStarted, setSystemStarted] = useState(false);
    const config = useSelector((state) => state.config);

    const handleStart = () => {
        fetch('http://localhost:8080/api/v1/system/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        }).then((response) => {
            if (response.ok) {
                alert('System started successfully!');
                setSystemStarted(true);
            }
        });
    };

    const handleStop = () => {
        fetch('http://localhost:8080/api/v1/system/stop', { method: 'POST' }).then((response) => {
            if (response.ok) {
                alert('System stopped successfully!');
                setSystemStarted(false);
            }
        });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Control Panel
            </Typography>
            <ConfigurationForm systemStarted={systemStarted} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                <Button variant="contained" color="success" onClick={handleStart}>
                    Start System
                </Button>
                <Button variant="contained" color="error" onClick={handleStop}>
                    Stop System
                </Button>
            </Box>
            {systemStarted && (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                        <CustomerSection />
                        <VendorSection />
                    </Box>
                    <TicketDisplay />
                </>
            )}
        </Box>
    );
};

export default ControlPanel;