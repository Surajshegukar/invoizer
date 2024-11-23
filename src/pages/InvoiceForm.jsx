import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Dummy data for students and items
const dummyStudents = [
  { id: "1", studentName: "John Doe", studentContact: "1234567890", studentID: "S123", studentClass: "12" },
  { id: "2", studentName: "Jane Smith", studentContact: "0987654321", studentID: "S124", studentClass: "11" },
  { id: "3", studentName: "Michael Brown", studentContact: "5678901234", studentID: "S125", studentClass: "10" },
];

const dummyItems = [
  { id: 1, name: "Tuition Fee", fee: 500 },
  { id: 2, name: "Library Fee", fee: 100 },
  { id: 3, name: "Sports Fee", fee: 150 },
];

const InvoiceForm = ({ invoice, setInvoice, items, setItems,handleSubmit }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const students = useSelector((state) => state.student.students);
  const allItems = useSelector((state) => state.items.items);
  const [totalDiscount, setTotalDiscount] = useState(0);
  

  // Calculate the final total amount whenever items change
  useEffect(() => {
    const calculateFinalAmount = () => {
      const total = items.reduce((acc, item) => acc + item.amount, 0);
      
      const totaldiscount = items.reduce((acc, item) => acc + item.fees * item.discount / 100, 0);
      setTotalAmount(total);
      setTotalDiscount(totaldiscount);
      setInvoice((prev) => ({ ...prev, totalAmount: total, totalDiscountedAmount: totaldiscount }));
    };
    calculateFinalAmount();
  }, [items, setInvoice]);

  // Update item field values and recalculate total for each item
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "fees" || field === "dividend" || field === "discount" ? parseFloat(value) || 0 : value;

    // Calculate final amount for the item based on fee, discount, and dividend
    const { fees, discount, dividend } = updatedItems[index];
    updatedItems[index].amount = fees * (1 - discount / 100) + dividend;

    setItems(updatedItems);
    setInvoice((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleOnStudentSelect = (e) => {
    const student = students.find((student) => student._id === e.target.value);
    console.log("student : ",student);
    setInvoice((prev) => ({
      ...prev,
      studentId:student._id,
      studentName: student.studentName,
      studentContact: student.studentContact,
      studentID: student.studentID,
      studentClass: student.studentClass,
    }));
  };

  // Add a new blank item
  const addItem = () => {
    setItems([...items, { itemId:"",itemName: "", fees: 0, dividend: 0, discount: 0, amount: 0 }]);
  };

  // Remove an item and update the total
  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form validation before submission
    if (!invoice.invoiceNumber || !invoice.invoiceDate || !invoice.studentName || items.length === 0) {
      alert("Please fill in all required fields and add at least one item.");
      return;
    }
    
    // Add submit logic here if required
    handleSubmit(invoice);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Invoice Number and Invoice Date in one row */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={(e) => setInvoice((prev) => ({ ...prev, invoiceDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      {/* Student selection dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700">Student</label>
        <select
          onChange={(e) => {
            const student = dummyStudents.find((s) => s.id === e.target.value);
            handleOnStudentSelect(e);
            if (student) {
              setInvoice((prev) => ({
                ...prev,
                studentName: student.studentName,
                studentContact: student.studentContact,
                studentID: student.studentID,
                studentClass: student.studentClass,
              }));
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student._id}>
              {student.studentName} (Class {student.studentClass})
            </option>
          ))}
        </select>
      </div>

      {/* Item list with fields for each item's properties */}
      <div className="mb-4">
        <label className="block text-gray-700">Items</label>
        {items.map((item, index) => (
          <div key={index} className="flex flex-wrap items-center mt-2 space-x-2">
            <div className="flex-0">
            <label className="block text-gray-700">Item Name</label>
            <select
              value={item.itemId}
              
              onChange={(e) => {
                const temp = allItems.find((i) => i._id === e.target.value);
                handleItemChange(index, "itemName", temp.itemName);
                handleItemChange(index, "fees", temp.fees);
                handleItemChange(index, "itemId", temp._id);
              }}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Item</option>
              {allItems.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.itemName}
                </option>
              ))}
            </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Fee</label>
              <input
                type="number"
                value={item.fees}
                onChange={(e) => handleItemChange(index, "fees", e.target.value)}
                className="w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Fee"
                readOnly
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Dividend</label>
              <input
                type="number"
                value={item.dividend}
                onChange={(e) => handleItemChange(index, "dividend", e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Dividend"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Discount (%)</label>
              <input
                type="number"
                value={item.discount}
                onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Discount"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                value={item.amount.toFixed(2)}
                readOnly
                className="w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Amount"
              />
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add Item
        </button>
      </div>

      {/* Display total amount */}
      <div className="flex justify-between mt-4">
        <span className="font-semibold">Total Discounted Amount</span>
        <span>{totalDiscount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="font-semibold">Total Amount:</span>
        <span>{totalAmount.toFixed(2)}</span>
      </div>

      {/* Submit button */}
      <div className="mt-6">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Submit Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
