import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ControlPanel from './component/ControlPanel';
import { Container } from '@mui/material';

const App = () => (
    <Provider store={store}>
        <Container sx={{ padding: 4 }}>
            <ControlPanel />
        </Container>
    </Provider>
);

export default App;