import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EditInvoiceForm = ({ invoiceData, handleUpdate }) => {
  const [editInvoice, setEditInvoice] = useState(invoiceData);
  const [items, setItems] = useState(invoiceData.items || []);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const students = useSelector((state) => state.student.students);
  const allItems = useSelector((state) => state.items.items);

  useEffect(() => {
    console.log(editInvoice);
    const calculateFinalAmount = () => {
      const total = items.reduce((acc, item) => acc + item.amount, 0);
      const totaldiscount = items.reduce((acc, item) => acc + item.fees * item.discount / 100, 0);
      setTotalAmount(total);
      setTotalDiscount(totaldiscount);
      setEditInvoice((prev) => ({ ...prev, totalAmount: total, totalDiscountedAmount: totaldiscount }));
    };
    calculateFinalAmount();
  }, [items]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "fees" || field === "dividend" || field === "discount" ? parseFloat(value) || 0 : value;

    const { fees, discount, dividend } = updatedItems[index];
    updatedItems[index].amount = fees * (1 - discount / 100) + dividend;

    setItems(updatedItems);
    setEditInvoice((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleOnStudentSelect = (e) => {
    const student = students.find((student) => student._id === e.target.value);
    setEditInvoice((prev) => ({
      ...prev,
      studentId: student._id,
      studentName: student.studentName,
      studentContact: student.studentContact,
      studentID: student.studentID,
      studentClass: student.studentClass,
    }));
  };

  const addItem = () => {
    setItems([...items, { itemId: "", itemName: "", fees: 0, dividend: 0, discount: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!editInvoice.invoiceNumber || !editInvoice.invoiceDate || !editInvoice.studentName || items.length === 0) {
      alert("Please fill in all required fields and add at least one item.");
      return;
    }
    handleUpdate(editInvoice);
    
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={editInvoice.invoiceNumber || ""}
            onChange={(e) => setEditInvoice((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={new Date(editInvoice.invoiceDate).toISOString().split('T')[0] || ''}
            onChange={(e) => setEditInvoice((prev) => ({ ...prev, invoiceDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Student</label>
        <select
          value={editInvoice.studentId || ""}
          onChange={handleOnStudentSelect}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select Student</option>
          {students && students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.studentName} (Class {student.studentClass})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Items</label>
        {items && items.map((item, index) => (
          <div key={index} className="flex flex-wrap items-center mt-2 space-x-2">
            <div className="flex-0">
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
              <input
                type="number"
                value={item.fees || 0}
                readOnly
                className="w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={item.dividend || 0}
                onChange={(e) => handleItemChange(index, "dividend", e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={item.discount || 0}
                onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={item.amount || 0}
                readOnly
                className="w-full bg-gray-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button type="button" onClick={() => removeItem(index)} className="ml-2 text-red-600 hover:text-red-800">
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

      <div className="flex justify-between mt-4">
        <span className="font-semibold">Total Discounted Amount</span>
        <span>{totalDiscount}</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="font-semibold">Total Amount:</span>
        <span>{totalAmount}</span>
      </div>

      <div className="mt-6">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
          Update Invoice
        </button>
      </div>
    </form>
  );
};

export default EditInvoiceForm;
