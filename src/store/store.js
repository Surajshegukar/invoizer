// redux toolkit

import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceSlice';
import itemsReducer from './itemsSlice';
import userReducer from './userSlice';
import studentReducer from './studentsSlice';


export const store = configureStore({
    reducer: {
        invoice: invoiceReducer,
        items : itemsReducer,
        user : userReducer,
        student: studentReducer
    },
    });

export default store;
