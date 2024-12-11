import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig: (state, action) => {
            return {...state, ...action.payload};
        }
    }
});

export const {setConfig} = configSlice.actions;
export default configSlice.reducer;