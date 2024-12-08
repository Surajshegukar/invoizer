import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base_url } from '../config';
import Cookies from 'js-cookie';
import { token } from '../config';




export const fetchItems = createAsyncThunk('items/fetchItems', async() => {
    
    const response = await fetch(`${base_url}/api/item/get-items`,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // 'authorization': localStorage.getItem('token'),
            'authorization': token
        },
    });
    const data = await response.json();
    return data;
}
);

export const addItem = createAsyncThunk('items/addItem', async(item) => {
    const response = await fetch(`${base_url}/api/item/add-item`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': token
        },
    });
    const data = await response.json();
    return data;
}
);

export const deleteItem = createAsyncThunk('items/deleteItem', async(itemId) => {
    const response = await fetch(`${base_url}/api/item/delete-item/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': token
        },
    });
    const data = await response.json();
    return data;
}
);

export const updateItem = createAsyncThunk('items/updateItem', async(item) => {
    const response = await fetch(`${base_url}/api/item/update-item/${item._id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': token
            
        },
    });
    const data = await response.json();
    return data;
}
);

export const addMultipleItems = createAsyncThunk('items/addMultipleItems', async(items) => {
    const response = await fetch(`${base_url}/api/item/add-multiple-items`, {
        method: 'POST',
        body: JSON.stringify(items),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': token
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
            {
                _id: '1',
                itemName: 'item1',
                fees: 100
            },
            {
                _id: '2',
                itemName: 'item2',
                fees: 200
            },
            {
                _id: '3',
                itemName: 'item3',
                fees: 300
            },
            
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

            builder.addCase(updateItem.pending, (state) => {
                state.loading = true;
            });

            builder.addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.map((item) => item._id === action.payload._id ? action.payload : item);
            });

            builder.addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

            builder.addCase(addMultipleItems.pending, (state) => {
                state.loading = true;
            });

            builder.addCase(addMultipleItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            });

            builder.addCase(addMultipleItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            }
        );
    }
});

export default itemsSlice.reducer;
