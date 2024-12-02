import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import Template from '../template/Template';
import { CSVLink } from 'react-csv';
import {
  fetchInvoices, deleteInvoice, updateInvoice
} from '../store/invoiceSlice';
import { fetchItems } from '../store/itemsSlice';
import { fetchStudents } from '../store/studentsSlice';
import EditInvoiceForm from './EditInvoiceForm';
import LoadingModel from './LoadingModel';
import { useCookies } from 'react-cookie';


const ShowInvoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoice.invoices);
  const students = useSelector(state => state.student.students);
  const items = useSelector(state => state.items.items);
  const [cookies, setCookie] = useCookies(['user']);

  const invoiceLoading = useSelector(state => state.invoice.loading)
  const studentsLoading = useSelector(state => state.student.loading)
  const itemsLoading = useSelector(state => state.items.loading)

  

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editInvoiceData,setEditInvoiceData] = useState({});
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [reload, setReload] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchParameter, setSearchParameter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const studentLookup = useMemo(() => {
    return Object.fromEntries(students.map(student => [student._id, student]));
  }, [students]);

  const itemLookup = useMemo(() => {
    return Object.fromEntries(items.map(item => [item._id, item]));
  }, [items]);

  const processedInvoices = useMemo(() => {
    return invoices.map(invoice => ({
      ...invoice,
      invoiceDate: new Date(invoice.invoiceDate).toLocaleDateString(),
      studentName: studentLookup[invoice.studentId]?.studentName || '',
      studentID: studentLookup[invoice.studentId]?.studentID || '',
      studentContact: studentLookup[invoice.studentId]?.studentContact || '',
      studentClass: studentLookup[invoice.studentId]?.studentClass || '',
      items:invoice.items && invoice.items.map(item => ({
        ...item,
        itemName: itemLookup[item.itemId]?.itemName || '',
        fees: itemLookup[item.itemId]?.fees || 0
      }))
    }));
  }, [invoices, studentLookup, itemLookup]);

  const handleDeleteInvoice = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    dispatch(deleteInvoice(deleteId)).then(() => {
      setReload(prev => !prev);
      setIsDeleteModalOpen(false);
    });
  };

  

  const handlePreview = (invoice) => {
    setIsPreviewModalOpen(true);
    setPreviewInvoice(invoice);
    console.log(invoice);
  };

  

  const handleUpdateInvoice = (data) => {
    dispatch(updateInvoice(data)).then(() => {
      setReload(prev => !prev);
      setIsEditModalOpen(false);
      setEditInvoiceData({});
    });
  };

  const handleOnSelect = (e) => {
    const value = e.target.value;
    dispatch(value === 'all' ? fetchInvoices() : fetchInvoices(value));
  };

  

  const ExportCSV = () => {
    const headers = [
      { label: 'No', key: 'id' },
      { label: 'Invoice No.', key: 'invoiceNumber' },
      { label: 'Student Name', key: 'studentName' },
      { label: 'Student ID', key: 'studentID' },
      { label: 'Date', key: 'invoiceDate' },
    ];
    const data = processedInvoices.map((invoice, index) => ({
      id: index + 1,
      invoiceNumber: invoice.invoiceNumber,
      studentName: invoice.studentName,
      studentID: invoice.studentID,
      invoiceDate: invoice.invoiceDate
    }));

    return (
      <CSVLink data={data} headers={headers} filename="invoices.csv">
        <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          <i className="fas fa-download"></i> Export
        </button>
      </CSVLink>
    );
  };

  useEffect(() => {
    dispatch(fetchInvoices()).then(() => {
      setInvoices(invoiceslist);
    });
  }, [reload]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (searchValue === '') {
      setSearchResults([]);
    }
    else {
      setSearchResults(processedInvoices.filter(invoice => invoice[searchParameter].toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue, searchParameter, processedInvoices]);


  useEffect(() => {
    if (!cookies.user) {
      window.location.href = '/login';
    }
  }
  , [cookies.user]);
  


  
  

  return (
    <div className="md:mx-[10vw] mx-[20px]">
      <h1 className="text-lg mt-2 font-semibold text-gray-900 dark:text-gray-400">Invoices</h1>
  
      <div className="p-2 relative overflow-x-auto sm:rounded-lg">
        <div className="mt-4 flex sm:flex-row sm:gap-1 flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="flex gap-4">
            <div>
              <select
                id="table-filter"
                name="fetchfilter"
                className="text-sm text-gray-900 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleOnSelect}
              >
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-3months">Last 3 Months</option>
              </select>
            </div>
  
            <ExportCSV />
          </div>
  
          <div className="flex gap-4">
            <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <i className="fas fa-plus"></i> Add Invoice
            </button>
            <button
              onClick={() =>setReload(!reload)}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <i className="fas fa-reload"></i> Reload
            </button>
          </div>
  
          <div className="search flex gap-3 items-center">
            <div className="select-param">
              <select
                id="search-filter"
                name="searchfilter"
                className="text-sm text-gray-900 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setSearchParameter(e.target.value);
                  setSearchValue('');
                }}
              >
                <option value="">Select Parameter</option>
                <option value="studentName">Student Name</option>
                <option value="studentID">Student ID</option>
                <option value="invoiceNumber">Invoice No.</option>
                <option value="invoiceDate">Date</option>
              </select>
            </div>
            <div className="search-io">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  name="search"
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for Invoice"
                  value={searchValue}
                />
                {/* <button
                  onClick={handleSearch}
                  className="absolute inset-y-0 right-0 rtl:right-0 rtl:inset-r-0 flex items-center justify-center px-4 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                >
                  Search
                </button> */}
              </div>
            </div>
          </div>
        </div>
  
        <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-4 font-medium">No</th>
              <th className="py-3 px-4 font-medium">Invoice No.</th>
              <th className="py-3 px-4 font-medium">Student Name</th>
              <th className="py-3 px-4 font-medium">Student ID</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {processedInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-3">No Invoices Found</td>
              </tr>
            )}
            {processedInvoices.map((invoice, index) => (
              <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                <td className="py-3 px-4">{invoice.studentName}</td>
                <td className="py-3 px-4">{invoice.studentID}</td>
                <td className="py-3 px-4">{(invoice.invoiceDate)}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={() => handlePreview(invoice)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteInvoice(invoice._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setEditInvoiceData(invoice)

                      }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="my-5">
        <Pagination />
      </div>
  
      {isPreviewModalOpen && (
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
  
      {isEditModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isEditModalOpen ? "block" : "hidden"}`}>
          <div className="bg-white rounded-lg shadow-lg w-full sm:w-[50vw] overflow-y-auto p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-900">Edit Invoice</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-red-500 hover:text-red-700"
              >
                Close
              </button>
            </div>
            <EditInvoiceForm invoiceData={editInvoiceData} handleUpdate={handleUpdateInvoice}  />
         
          </div>
        </div>
      )}
      {
        isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-5 rounded-lg">
              <h1 className="text-2xl text-center">Are you sure you want to delete this invoice?</h1>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleDeleteConfirmation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteId(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        invoiceLoading || studentsLoading || itemsLoading && (
          <LoadingModel/>
        )
      }

      {
        searchValue !== '' && (
          // invoice table search results
          <div>
            
          <h3 className="pt-4 mb-3 text-2xl text-center">Search Results</h3>
          <table className="w-full overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-4 font-medium">No</th>
              <th className="py-3 px-4 font-medium">Invoice No.</th>
              <th className="py-3 px-4 font-medium">Student Name</th>
              <th className="py-3 px-4 font-medium">Student ID</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-3">No Invoices Found</td>
              </tr>
            )}
            {searchResults.map((invoice, index) => (
              <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{invoice.invoiceNumber}</td>
                <td className="py-3 px-4">{invoice.studentName}</td>
                <td className="py-3 px-4">{invoice.studentID}</td>
                <td className="py-3 px-4">{(invoice.invoiceDate)}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={() => handlePreview(invoice)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleDeleteInvoice(invoice._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setEditInvoiceData(invoice)

                      }}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        )
      }
    </div>
  );
}  
export default ShowInvoices
