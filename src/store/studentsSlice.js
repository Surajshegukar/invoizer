import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await fetch('http://localhost:5000/api/student/get-students',{
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

export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
    const response = await fetch('http://localhost:5000/api/student/add-student', {
        method: 'POST',
        body: JSON.stringify(student),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
        },
    });
    const data = await response.json();
    return data;
}
);

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (studentId) => {
    const response = await fetch(`http://localhost:5000/api/student/delete-student/${studentId}`, {
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

export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
    const response = await fetch(`http://localhost:5000/api/student/update-student/${student._id}`, {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjRiMjlkOTIxYmRiZWM2YzY4Y2E3MyIsImlhdCI6MTczMTIyNzk3NCwiZXhwIjoxNzMxODMyNzc0fQ.OkCyZVzLpJyyDTgTTpZF_g2Kq9NTXA6VLgSS-dDs160"
            
        },
    });
    const data = await response.json();
    return data;
}
);


const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [
            {
                _id: '1',
                studentName: 'John Doe',
                studentContact: 1234567890,
                studentID: '123456',
                studentClass: '10th',
            }
        ],
        loading: false,
        error: null,
    },
    extraReducers:(builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.loading = false;
            state.students = action.payload.data;
        }
        );
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );

        builder.addCase(addStudent.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(addStudent.fulfilled, (state, action) => {
            state.students.push(action.payload.data);
            state.loading = false;
        }
        );
        builder.addCase(addStudent.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        }
        );

        builder.addCase(deleteStudent.pending, (state) => {
            state.loading = true;
        }
        );

        builder.addCase(deleteStudent.fulfilled, (state, action) => {
            state.loading = false;
            state.students = state.students.filter((student) => student._id !== action.payload);
        }
        );

        builder.addCase(deleteStudent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );

        builder.addCase(updateStudent.pending, (state) => {
            state.loading = true;
        }
        );

        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.students = state.students.map((student) => student._id === action.payload.data._id ? action.payload.data : student);
        }
        );

        builder.addCase(updateStudent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        );
    }
}
);

export default studentSlice.reducer;

