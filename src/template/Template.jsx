import React, { useEffect } from "react";

const Invoice = (props) => {

    useEffect(() => {
        console.log("");
    }, [props]);

    const { invoice } = props;
    const invoiceData = {
    schoolName: "Bordikars Podar Learn School",
    phone: "9960178607",
    billTo: invoice.studentName,
    contact: invoice.studentContact,
    studentId: invoice.studentID,
    class: invoice.studentClass ,
    invoiceNo: invoice.invoiceNumber,
    date: invoice.invoiceDate,
    items: invoice.items,
    totalDiscount: invoice.totalDiscountedAmount,
    subTotal: invoice.totalAmount,
    total: invoice.totalAmount,
    amountInWords: "Forty Seven Thousand Four Hundred Rupee Only",
    receivedBy: 20000,
    balance: 27400,
    saved: 0,
    terms: "Thanks for doing business with us!",
  };

  return (
    <div className="max-w-2xl mx-auto pt-2">
      <h2 className="text-center font-bold text-xl mb-2">Receipt</h2>
      <div className="border border-b-0 border-gray-800 p-4">
        <h3 className="font-bold text-lg text-center">
          {invoiceData.schoolName}
        </h3>
        <p className="text-center">Phone: {invoiceData.phone}</p>
      </div>

      <table className="w-full border border-gray-800 mb-4">
        <tr className="border-b border-gray-800">
          <td className="p-2 font-bold border-r border-gray-800">Bill To</td>
          <td className="p-2 font-bold ">Invoice Details</td>
        </tr>
        <tr className="">
        <td className="p-2 border-r font-bold border-gray-800">{invoiceData.billTo}</td>
        <td className="p-2 ">Invoice No : <b>{invoiceData.invoiceNo}</b></td>
          
        </tr>
        <tr className="">
          <td className="p-2 border-r border-gray-800">Contact :<b>{invoiceData.contact}</b></td>
          <td className="p-2">Date : <b>{(invoiceData.date).slice(0,10)}</b></td>
          
        </tr>
        <tr className="">
          <td className="p-2  border-r border-gray-800">Student ID :<b>{invoiceData.studentId}</b></td>
        </tr>
        <tr className="border-b border-gray-800">
          <td className="p-2 border-r border-gray-800">Class: <b>{invoiceData.class}th</b></td>
        </tr>
        
        
      </table>

      <table className="w-full border border-gray-800">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="p-2 border-r border-gray-800">#</th>
            <th className="p-2 border-r border-gray-800">Item name</th>
            <th className="p-2 border-r border-gray-800">Divident</th>
            <th className="p-2 border-r border-gray-800">Fees</th>
            <th className="p-2 border-r border-gray-800">Discount</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-800">
              <td className="p-2 border-r border-gray-800 text-center">{item.id}</td>
              <td className="p-2 border-r border-gray-800">{item.itemName}</td>
              <td className="p-2 border-r border-gray-800 text-center">{item.dividend}</td>
              <td className="p-2 border-r border-gray-800 text-right">{item.fees}</td>
              <td className="p-2 border-r border-gray-800 text-right">{item.discount}</td>
              <td className="p-2 text-right">{
                item.fees * (1 - item.discount / 100)
                }</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              
            </td>
            <td colSpan="3" className="p-2 border-r border-gray-800 font-bold text-left">
              Total
            </td>
            <td className="p-2 border-r border-gray-800 text-right">{invoiceData.totalDiscount}</td>
            <td className="p-2 font-bold text-right">{invoiceData.total}</td>
          </tr>
        </tfoot>
      </table>
      <table className="w-full border border-t-0 border-gray-800 mb-4">
        <tr className="border-b border-gray-800">
          <td className="p-2" colSpan={6}>Sub Total</td>
          <td className="p-2 text-right" >{invoiceData.total}</td>
        </tr>
        <tr className="border-b border-gray-800">
          <td className="p-2 font-bold" colSpan={6}>Total</td>
          <td className="p-2 text-right font-bold">{invoiceData.total}</td>
        </tr>
        <tr className="border-b border-gray-800">
          <td className="p-2">
            Invoice amount in words:
          </td>
        </tr>
        <tr className="border-b border-gray-800">
          <td className="p-2 font-semibold">{invoiceData.amountInWords}</td>
        </tr>
        <tr>
          <td colSpan={6} className="p-2 text-left">Received</td>
          <td className="p-2 text-right"></td>
        </tr>
        <tr>
          <td colSpan={6} className="p-2 text-left">
            Balance
          </td>
          <td className="p-2 text-right">
            {invoiceData.balance}
          </td>
        </tr>
        <tr>
          <td colSpan={6} className="p-2 text-left">
            You Saved
          </td>
          <td className="p-2 text-right">
            {invoiceData.totalDiscount}
          </td>
        </tr>
      </table>

      <table className="w-full border border-gray-800">
        <tr className="font-bold border-b border-gray-800">
          <td className="p-2">Terms & Conditions</td>
        </tr>
        <tr className="border-b border-gray-800">
          <td className="p-2">{invoiceData.terms}</td>
        </tr>
        <tr className="">
          <td></td>
          <td className="p-2 bg-gray-500 font-bold text-left border-b border-l border-gray-800">For {invoiceData.schoolName}</td>
        </tr>
        <tr>
          <td></td>
          <td className="p-2 border-b border-l border-gray-800 pt-9 text-center">Authorized Signature</td>
        </tr>
      </table>

      
    </div>
  );
};

export default Invoice;
