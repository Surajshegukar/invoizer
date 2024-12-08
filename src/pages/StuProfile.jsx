import React, { useEffect, useState } from "react";
import { BookOpen, Mail, Phone, Calendar, ChevronDown, SectionIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../store/studentsSlice";
import { fetchInvoices } from "../store/invoiceSlice";
import {fetchItems} from "../store/itemsSlice";
import Template from '../template/Template';
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";


export default function StuProfile() {
  // Dummy student data
  const students = useSelector((state) => state.student.students);
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [invoices, setInvoices] = useState({});
  const dispatch = useDispatch();
  const [isPreviewModalOpen,setIsPreviewModalOpen]= useState(false);
  const [previewInvoice,setPreviewInvoice] = useState(null);
  const [cookies, setCookie] = useCookies(['user']);


  // Dummy invoice data
  const invoiceslist = useSelector((state) => state.invoice.invoices);
  const itemsList = useSelector((state) => state.items.items);

  // creating a new array of invoices for the selected student containing studentdetails,invoicedetail and items  details

  const preprocessedInvoices = invoiceslist.map((invoice) => {
    const student = students.find((student) => student._id === invoice.studentId);
   
    return {
      ...invoice,
      studentName: student?.studentName,
      studentID: student?.studentID,
      studentClass: student?.studentClass,
      studentContact: student?.studentContact,
      // adding items to the invoice.items array from the itemsList
      items : invoice.items?.map((item) => {
        const itemDetails = itemsList.find((i) => i._id === item.itemId);
        return {
          ...item,
          ...itemDetails,
        };
      }),

    };
  });

  // filtering the invoices for the selected student
  

  const studentInvoice = preprocessedInvoices.filter((invoice) => invoice.studentId === selectedStudent._id);

  useEffect(() => {
    document.title = `${selectedStudent.name} - Student Profile | Invoizer`;
  }, [selectedStudent]);
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchInvoices());
    dispatch(fetchItems());

  }, []);

  useEffect(() => {
    if(!cookies.user) {
      window.location.href = '/login';
    }
  }
  , []);

  useEffect(() => {
    if (students.length === 0) {
      toast.error("No student found");
      window.location.href = '/students';

    }
  }, [students]);

  const handlePreview =(e,invoice)=>{
    e.preventDefault();
    setPreviewInvoice(invoice);
    setIsPreviewModalOpen(true);
    console.log(invoice);

  }



  return (
    <div className="h-[100vh]">
      <div className="max-w-4xl mx-auto mb-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl">
        {/* Student Selection Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="student-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Student
          </label>
          <div className="relative">
            <select
              id="student-select"
              value={selectedStudent._id}
              aria-placeholder="Select a student"
              onChange={(e) =>
                setSelectedStudent(
                  students.find((s) => s._id === e.target.value)
                )
              }
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            >
              
              {
                students && students.length === 0 && <option value="" disabled> No student found</option>
              }
              {students &&
                students.map((student) => (
                  

                  <option key={student._id} value={student._id}>
                    {student.studentName}
                  </option>
                ))}


            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Student Profile Section */}
        <div className="mb-10 flex flex-col md:flex-row items-center md:items-start">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <img
              src={selectedStudent.profilePicture}
              alt={`${selectedStudent.studentName}'s profile`}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Active
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {selectedStudent.studentName}
            </h2>
            <p className="text-gray-600 mb-4">
              Student ID: {selectedStudent.studentID}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Grade: {selectedStudent.studentClass}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                <span>{selectedStudent.email || "N/A"}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 mr-2 text-indigo-600" />
                <span>{selectedStudent.studentContact}</span>
              </div>
              {/* <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Enrolled: {selectedStudent.enrollmentDate}</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Invoice Table Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Invoice History
          </h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-300">
                  <th className="py-3 px-4 font-semibold text-indigo-800">
                    Invoice ID
                  </th>
                  <th className="py-3 px-4 font-semibold text-indigo-800">
                    Date
                  </th>
                  <th className="py-3 px-4 font-semibold text-indigo-800">
                    Amount
                  </th>
                  <th className="py-3 px-4 font-semibold text-indigo-800">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentInvoice && studentInvoice.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-3 px-4 text-center">
                      No invoices found for this student.
                    </td>
                  </tr>
                )
              
                
                }
                {studentInvoice &&
                  studentInvoice.map((invoice, index) => (
                    <tr
                      key={invoice._id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4 border-b border-gray-200">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {invoice.invoiceDate.slice(0, 10)}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        ${invoice.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3 flex gap-x-4 px-4 border-b border-gray-200">
                        <button className="text-blue-500">
                          <i class="fa-solid fa-pen hover:bg-slate-400"></i> Edit
                        </button>
                        <button className="text-red-500">
                          <i class="fa-solid fa-trash hover:bg-slate-400"></i> Delete
                        </button>
                        <button className="text-green-400" onClick={(e)=>handlePreview(e,invoice)} style={{cursor:"pointer"}}>
                          <i class="fa-regular fa-eye  hover:bg-slate-400"></i> Preview
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isPreviewModalOpen && previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white lg:w-[50vw] w-[90vw] h-[90vh] rounded-lg overflow-x-scroll lg:overflow-x-hidden shadow-lg overflow-y-scroll">
            <div className="flex justify-end p-5">
              <button className="text-red-500 hover:text-red-700" onClick={() => setIsPreviewModalOpen(false)}>
                Close X
              </button>
            </div>
            <div className="p-5">
              <Template invoice={previewInvoice} />
            </div>
          </div>
        </div>
      )}
      
    </div>
   
  );
}
