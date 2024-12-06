import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../store/studentsSlice'
import { useEffect } from 'react'
import Pagination from '../components/Pagination'
import { addStudent as addStudentFxn } from '../store/studentsSlice'
import { updateStudent } from '../store/studentsSlice'
import { deleteStudent } from '../store/studentsSlice'
import { useState } from 'react'
import {useCookies } from 'react-cookie'
import toast from 'react-hot-toast'

function Student() {
  
    
  const dispatch = useDispatch()
  const students = useSelector(state => state.student.students)
  const loading = useSelector(state => state.student.loading)
  const [cookies, setCookie] = useCookies(['user']);
  // const [students,setStudents] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [deleteStudentId, setDeleteStudentId] = React.useState('');
  const [search, setSearch] = React.useState('');

  const [addStudent, setAddStudent] = React.useState({});
  const [editStudent, setEditStudent] = React.useState({});

  const handleStudentSearch = (e) => {
    setSearch(e.target.value);
  }


  const handleAddStudent = (e) => {
    e.preventDefault();
    dispatch(addStudentFxn(addStudent)).then((data) => {
      setIsAddModalOpen(false);
      setReload(!reload);
      setAddStudent({});
      if (data.payload.success === true) {
        toast.success(data.payload.message);
      }
      else {
        toast.error(data.payload.message);
        console.log(data.payload);
      }
    }
    );
  }

  const handleEditStudentChange = (e) => {
    setEditStudent({
      ...editStudent,
      [e.target.name]: e.target.value
    })
    
  }
const handleEditStudent = (student) => {
  setIsEditModalOpen(true)
  setEditStudent(student)
  console.log(editStudent);
}

const handleEditStudentSubmit = (e) => {
  e.preventDefault();
  dispatch(updateStudent(editStudent)).then((data) => {
    setIsEditModalOpen(false);
    setReload(!reload);
    setEditStudent({});
    if (data.payload.success === true) {
      toast.success(data.payload.message);
    }
    else {
      toast.error(data.payload.message);
      console.log(data.payload);
    }
  });
  
  
}

const handleDeleteStudent = (student) => {
  setDeleteStudentId(student._id);
  setIsDeleteModalOpen(true);
  // console.log('delete');
  // console.log(student._id);
}

const handleDeleteConfirm = (student) => {
  dispatch(deleteStudent(deleteStudentId)).then((data) => {
    setIsDeleteModalOpen(false);
    setReload(!reload);
    setDeleteStudentId('');
    if (data.payload.success === true) {
      toast.success(data.payload.message);
    }
    else {
      toast.error(data.payload.message);
      console.log(data.payload);
    }

  });
  
}

  const handleAddStudentChange = (e) => {
    setAddStudent({
      ...addStudent,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(fetchStudents()).then((data) => {
      if (data.payload.success === true) {
        toast.success(data.payload.message);
      }
      else {
        toast.error(data.payload.message);
        console.log(data.payload);
      }
    });

  }
  , [reload,dispatch])

  // fetch the data when students is empty
  

  return (
    <div className='mx-[10vw]'>
      <h1 className='p-2 my-3 font-bold border-b-2'>Student Table</h1>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={
          () => setIsAddModalOpen(!isAddModalOpen)
        }>Add Student</button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mt-4 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <label for="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input onChange={handleStudentSearch} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for students" />
          </div>
        </div>
        <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-4 font-medium">No</th>
              <th className="py-3 px-4 font-medium">Student</th>
              <th className="py-3 px-4 font-medium">Student Class</th>
              <th className="py-3 px-4 font-medium">Student ID</th>
              <th className="py-3 px-4 font-medium">Contact</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>

          </thead>
          <tbody>
           
            
            {students.map((student, index) => (
              <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{student.studentName}</td>
                <td className="py-3 px-4">{student.studentClass}</td>
                <td className="py-3 px-4">{student.studentID}</td>
                <td className="py-3 px-4">{student.studentContact}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700" onClick={
                    () => handleEditStudent(student)
                  }>Edit</button>
                  <button className="text-red-500 hover:text-red-700" onClick={
                    () => handleDeleteStudent(student)
                  }>Delete</button>
                  </div>
                </td>
              </tr>
            ))  
            }
        
            {
              students && students.length === 0 && <tr><td className='text-center' colSpan={6}>No students found</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div className="my-5">
        <Pagination />
      </div>

      {/* Add Model */}
      {isAddModalOpen && (
        
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50">
          <div className="relative bg-white w-1/2 m-auto mt-10 p-5 rounded-lg">
            <h1 className="text-2xl font-bold mb-5">Add Student</h1>
            <button className="absolute top-5 right-5" onClick={() => setIsAddModalOpen(false)}>X</button>
            <form className='flex gap-5'>
              <div className="mb-4 w-1/2 ">
                <label for="student" className="block text-sm font-medium text-gray-700">Student</label>
                <input type="text" id="student" onChange={handleAddStudentChange} name="studentName" value={addStudent.studentName} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
              </div>
              <div className="mb-4 w-1/2 ">
                <label for="studentContact" className="block text-sm font-medium text-gray-700">Contact</label>
                <input type="tel" id="studentContact" onChange={handleAddStudentChange} name="studentContact" value={addStudent.studentContact} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" pattern="[0-9]{10}" />
              </div>
              <div className="mb-4 w-1/2 ">
                <label for="studentClass" className="block text-sm font-medium text-gray-700">StudentClass</label>
                <input type="number" id="studentClass" onChange={handleAddStudentChange} name="studentClass" value={addStudent.studentClass} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
              </div>
              <div className="mb-4 w-1/2 ">
                <label for="studentID" className="block text-sm font-medium text-gray-700">Student ID</label>
                <input type="text" id="studentID" onChange={handleAddStudentChange} name="studentID" value={addStudent.studentID} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
              </div>
              
            </form>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddStudent}>Add Student</button>
              </div>
          </div>
          </div>
      )}

      {/* Edit Model */}

      {
        isEditModalOpen && (

          <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50">
            <div className="relative bg-white w-1/2 m-auto mt-10 p-5 rounded-lg">
              <h1 className="text-2xl font-bold mb-5">Edit Student</h1>
              <button className="absolute top-5 right-5" onClick={() => setIsEditModalOpen(false)}>X</button>
              <form className='flex gap-5'>
                <div className="mb-4 w-1/2">
                  <label for="studentName" className="block text-sm font-medium text-gray-700">Student</label>
                  <input type="text" id="studentName" onChange={handleEditStudentChange} name="studentName" value={editStudent.studentName} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
                </div>
                <div className="mb-4 w-1/2">
                  <label for="studentContact" className="block text-sm font-medium text-gray-700">Contact</label>
                  <input type="tel" id="studentContact" onChange={handleEditStudentChange} name="studentContact" value={editStudent.studentContact} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
                </div>
                <div className="mb-4 w-1/2">
                  <label for="studentClass" className="block text-sm font-medium text-gray-700">StudentClass</label>
                  <input type="text" id="studentClass" onChange={handleEditStudentChange} name="studentClass" value={editStudent.studentClass} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
                </div>
                <div className="mb-4 w-1/2">
                  <label for="studentID" className="block text-sm font-medium text-gray-700">StudentID</label>
                  <input type="text" id="studentID" onChange={handleEditStudentChange} name="studentID" value={editStudent.studentID} className="mt-1 p-2 w-full border border-gray-300 rounded-lg" />
                </div>
               
              </form>
              <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditStudentSubmit}>Edit Student</button>
              </div>
            </div>
      </div>
        )
      }

      {/* Delete Model */}
      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-50">
            <div className="relative bg-white w-1/4 m-auto mt-10 p-5 rounded-lg">
              <h1 className="text-2xl font-bold mb-5">Delete Student</h1>
              <button className="absolute top-5 right-5" onClick={() => setIsDeleteModalOpen(false)}>X</button>
              <p>Are you sure you want to delete this student?</p>
              <div className="flex justify-end">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteConfirm}>Delete Student</button>
              </div>
            </div>
          </div>
        )
      }

      {
        loading && <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h1>Loading...</h1>
          </div>
        </div>

      }


    </div>
  )
}


export default Student