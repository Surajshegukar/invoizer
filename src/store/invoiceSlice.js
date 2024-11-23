// redux toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

// api call

export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async () => {
        const response = await fetch('http://localhost:5000/api/invoice/get-lastest-invoices',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const msg = await response.json();
        return msg;
    }
);

export const fetchAllInvoices = createAsyncThunk(
    'invoices/fetchAllInvoices',
    async () => {
        const response = await fetch('http://localhost:5000/api/invoice/get-all-invoices', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMDQ2MDgzNCwiZXhwIjoxNzMwODIwODM0fQ.BruVsmZgY6GT_IfCrVOvdU3WS4AokdutdmDgTJ1On3E'
            },
        });
        const data = await response.json();
        return data;
    }
);

export const fetchInvoiceById = createAsyncThunk(
    'invoices/fetchInvoiceById',
    async (invoiceId) => {
        const response = await fetch(`http://localhost:5000/api/invoice/get-invoice/${invoiceId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);

export const fetchInvoiceByStudentId = createAsyncThunk(
    'invoices/fetchInvoiceByStudentId',
    async (studentId) => {
        const response = await fetch(`http://localhost:5000/api/invoice/get-invoice-by-student-id/${studentId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);

export const fetchInvoiceByStudentName = createAsyncThunk(
    'invoices/fetchInvoiceByStudentName',
    async (studentName) => {
        const response = await fetch(`http://localhost:5000/api/invoice/get-invoices-by-student-name/${studentName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);


export const fetchInvoiceByDate = createAsyncThunk(
    'invoices/fetchInvoiceByDate',
    async (date) => {
        const response = await fetch(`http://localhost:5000/api/invoice/get-invoice-by-date/${date}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);

export const fetchInvoiceByClass = createAsyncThunk(
    'invoices/fetchInvoiceByClass',
    async (studentClass) => {
        const response = await fetch(`http://localhost:5000/api/invoice/get-invoice-by-class/${studentClass}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);


                

export const addInvoice = createAsyncThunk(
    'invoices/addInvoice',
    async (invoice) => {
        const response = await fetch('http://localhost:5000/api/invoice/add-invoice', {
            method: 'POST',
            body: JSON.stringify(invoice),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"

            },
        });
        const data = await response.json();
        return data;
    }
);

export const deleteInvoice = createAsyncThunk(
    'invoices/deleteInvoice',
    async (invoiceId) => {
        const response = await fetch(`http://localhost:5000/api/invoice/delete-invoice/${invoiceId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);

export const updateInvoice = createAsyncThunk(
    'invoices/updateInvoice',
    async (invoice) => {
        const response = await fetch(`http://localhost:5000/api/invoice/update-invoice/${invoice._id}`, {
            method: 'PUT',
            body: JSON.stringify(invoice),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // 'authorization': localStorage.getItem('token'),
                'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            },
        });
        const data = await response.json();
        return data;
    }
);



export const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoices: [{
            invoiceNo: 1,
            invoiceDate: '2021-10-10',
            studentId: '1',
            items: [
                {
                    itemId: '1',
                    divident: 1,
                    discount: 10,
                    amount: 90
                },
                {
                    itemId: '2',
                    divident: 2,
                    discount: 20,
                    amount: 180
                }
            ],
            totalDiscountedAmount: 270,
            totalAmount: 270,
            recivedAmount: 270,
            balanceAmount: 0

        }],
        error: null,
        loading: false,
        status: 'idle'
    },
    extraReducers:(builder) => {

        builder.addCase(fetchInvoices.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchInvoices.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(addInvoice.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices.push(action.payload);
        });

        builder.addCase(addInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteInvoice.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
        });

        builder.addCase(deleteInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateInvoice.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = state.invoices.map((invoice) => {
                if (invoice.id === action.payload.id) {
                    return action.payload;
                }
                return invoice;
            });
        });

        builder.addCase(updateInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchAllInvoices.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchAllInvoices.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchAllInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchInvoiceById.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchInvoiceById.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchInvoiceById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchInvoiceByStudentId.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchInvoiceByStudentId.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchInvoiceByStudentId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchInvoiceByDate.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchInvoiceByDate.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchInvoiceByDate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchInvoiceByClass.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchInvoiceByClass.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchInvoiceByClass.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(fetchInvoiceByStudentName.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchInvoiceByStudentName.fulfilled, (state, action) => {
            state.loading = false;
            state.invoices = action.payload.data;
            state.invoices.status = 'success';
        });

        builder.addCase(fetchInvoiceByStudentName.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );

        
            
            

    }
});

export default invoiceSlice.reducer;

