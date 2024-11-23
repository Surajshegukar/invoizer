import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Template from "../template/Template";
import InvoiceForm from "./InvoiceForm";
import { addInvoice } from "../store/invoiceSlice";
import { fetchStudents } from "../store/studentsSlice";
import { fetchItems } from "../store/itemsSlice";

const Invoice = () => {
  const invoiceRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.invoice.loading);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-0001",
    invoiceDate: "2021-09-01",
    studentId: "",
    studentName: "John Doe",
    studentContact: 1234567890,
    studentID: "S123",
    studentClass: 12,
    items: [
      {
        itemId: "",
        itemName: "",
        fees: 0,
        dividend: 0,
        discount: 0,
        amount: 0,
      },
    ],
    totalDiscountedAmount: 0,
    totalAmount: 0,
    receivedAmount: 0,
    balanceAmount: 0,
  });

  const [items, setItems] = useState([]);

  const savePdf = () => {
    const input = invoiceRef.current;
    input.style = "width: 900px; margin: 0 auto";
    const pdf = new jsPDF("p", "pt", "c3");
    pdf.html(input, {
      callback: function (pdf) {
        pdf.save("invoice.pdf");
        input.style = "width: 690px; margin: 0 auto";
      },
    });
  };

  const handleSubmit = (invoice) => {
   
    dispatch(addInvoice(invoice)).then(() => {
      alert("Invoice added successfully");
      console.log("invoice : ",invoice);
    }).then(() => {
      
      resetInvoice();
    });
  };

  const resetInvoice = () => {
    setInvoice({
      invoiceNumber: "INV-0001",
      invoiceDate: "2021-09-01",
      studentId: "",
      studentName: "John Doe",
      studentContact: 1234567890,
      studentID: "S123",
      studentClass: 12,
      items: [
        {
          itemId: "",
          itemName: "",
          fees: 0,
          dividend: 0,
          discount: 0,
          amount: 0,
        },
      ],
      totalAmount: 0,
      totalDiscountedAmount: 0,
      receivedAmount: 0,
      balanceAmount: 0,
    });
    setItems([]);
  };

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className="mx-10">
      <div className="container">
        <div className="flex flex-col-reverse md:flow-col lg:flex-row justify-between lg:h-auto px-2 my-10">
          {/* Invoice template preview */}
          <div className="w-full shadow-lg w-sm-100 overflow-x-scroll lg:overflow-x-hidden  bg-gray-400 lg:block mt-9 mb-12 lg:w-1/2 bg-cover rounded-l-lg">
            <div className="w-[590px] md:w-100  mx-auto" ref={invoiceRef}>
              <Template invoice={invoice} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 mb-3 text-2xl text-center">Invoice Form</h3>
            <InvoiceForm
              invoice={invoice}
              setInvoice={setInvoice}
              items={items}
              setItems={setItems}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h1 className="text-2xl text-center">Loading...</h1>
          </div>
        </div>
      )}

      {isModelOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h1 className="text-2xl text-center">
              Are you sure you want to save this invoice?
            </h1>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {handleSubmit}}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModelOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
