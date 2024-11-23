import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await fetch('http://localhost:5000/api/item/get-items',{
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // 'authorization': localStorage.getItem('token'),
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
        },
    });
    const data = await response.json();
    return data;
}
);

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await fetch('http://localhost:5000/api/item/add-item', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
        },
    });
    const data = await response.json();
    return data;
}
);

export const deleteItem = createAsyncThunk('items/deleteItem', async (itemId) => {
    const response = await fetch(`http://localhost:5000/api/item/delete-item/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
        },
    });
    const data = await response.json();
    return data;
}
);

export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
    const response = await fetch(`http://localhost:5000/api/item/update-item/${item._id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            
        },
    });
    const data = await response.json();
    return data;
}
);


export const itemsSlice = createSlice({

    name: 'items',
    initialState: {
        items: [
            
        ],
        error: null,
        loading: false
    },

    extraReducers: (builder) => {
            
            builder.addCase(fetchItems.pending, (state) => {
                state.loading = true;
            });
    
            builder.addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            });
    
            builder.addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    
            builder.addCase(addItem.pending, (state) => {
                state.loading = true;
            });
    
            builder.addCase(addItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            });
    
            builder.addCase(addItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    
            builder.addCase(deleteItem.pending, (state) => {
                state.loading = true;
            });
    
            builder.addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item._id !== action.payload);
            });
    
            builder.addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    
    },
});

export default itemsSlice.reducer;
