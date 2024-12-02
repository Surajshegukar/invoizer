import React, { useEffect, useRef,useState } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchInvoices } from "../store/invoiceSlice";
import { fetchStudents } from "../store/studentsSlice"; 



function Statement() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  
  // const list = useSelector((state) => state.invoice);
  const invoiceList = useSelector((state) => state.invoice.invoices);
  const studentList = useSelector((state) => state.student.students);
  const totalAmount = invoiceList.reduce((acc, invoice) => acc + invoice.totalAmount, 0);

  const statements = invoiceList.map((invoice) => {
    const student = studentList.find((student) => student._id === invoice.studentId);
    return {
      date: new Date(invoice.invoiceDate).toLocaleDateString(),
      particulars: student?.studentName,
      vchType: "Sales",
      vchNo: invoice.invoiceNumber,
      debit: "0.00",
      credit: invoice.totalAmount,
    };
  });

  const list = [
    {
      date: "01-Apr-24",
      particulars: "Opening Balance",
      vchType: "Opening",
      vchNo: "1",
      debit: "0.00",
      credit: "0.00",
    },
    {
      date: "01-Apr-24",
      particulars: "To Sales A/c",
      vchType: "Sales",
      vchNo: "2",
      debit: "1,29,681.00",
      credit: "0.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Cash A/c",
      vchType: "Cash",
      vchNo: "3",
      debit: "0.00",
      credit: "1,26,764.00",

    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "4",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "5",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "6",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "7",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "8",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "9",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "10",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "11",
      debit: "0.00",
      credit: "1,26,764.00",
    },
    {
      date: "01-Apr-24",
      particulars: "By Sales A/c",
      vchType: "Sales",
      vchNo: "12",
      debit: "0.00",
      credit: "1,26,764.00",
    },
  ]


  const pdfRef = useRef(null);
  const downloadPdf = () => {
    console.log("pdf");
    pdfRef.current.save();
  };

  useEffect(() => {
    if(!cookies.user) {
      window.location.href = '/login';
    }
  }
  , []);

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchStudents());
  }
  , []);

  

  return (
    <div className="mx-[60px]">
      <button onClick={downloadPdf}>Download PDF</button>
      <PDFExport ref={pdfRef} fileName="invoice" paperSize="A2">
        <div className="mx-10 my-20">
          <div class="text-center mb-8">
            <h1 class="text-xl font-semibold">Bordikars Podar Learn School</h1>
            <p>
              Ramakrishna Nagar, Basmat Road, Behind Gulmohar Hotel, Bank
              Colony, Parbhani - 431401
            </p>
            <p>Maharashtra - 431401, India</p>
            {/* <h2 class="text-lg font-semibold mt-4">VINU Enterprises, Jintur</h2>
            <p>Ledger Account</p>
            <p>Nilkanth Complex, Above Aniket Xerox, Jintur</p>
            <p>Maharashtra, India</p>
            <p>1-Apr-24 to 7-Oct-24</p> */}
            <p class="text-right mt-4 font-semibold">Page 1</p>
          </div>

          <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <table class="w-full text-sm text-left text-gray-700 border border-gray-300">
              <thead class="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th class="py-2 px-4 border">Date</th>
                  <th class="py-2 px-4 border">Student Name</th>
                  {/* <th class="py-2 px-4 border">Vch Type</th> */}
                  <th class="py-2 px-4 border">Invoice No.</th>
                  {/* <th class="py-2 px-4 border text-right">Debit</th> */}
                  <th class="py-2 px-4 border text-right">Credit</th>
                </tr>
              </thead>

              <tbody class="text-gray-600">
                {statements && statements.map((item) => (
                  <tr>
                    <td class="py-2 px-4 border">{item.date}</td>
                    <td class="py-2 px-4 border">{item.particulars}</td>
                    {/* <td class="py-2 px-4 border">{item.vchType}</td> */}
                    <td class="py-2 px-4 border">{item.vchNo}</td>
                    {/* <td class="py-2 px-4 border text-right">{item.debit}</td> */}
                    <td class="py-2 px-4 border text-right">{item.credit}</td>
                  </tr>
                ))}

                


                <tr class="font-semibold bg-gray-100">
                  <td colspan="3" class="py-2 px-4 border text-right">
                    Closing Balance
                  </td>
                  {/* <td class="py-2 px-4 border text-right"></td> */}
                  <td class="py-2 px-4 border text-right">1,26,764.00</td>
                </tr>

                <tr class="font-bold bg-gray-200">
                  <td colspan="3" class="py-2 px-4 border text-right">
                    Total
                  </td>
                  {/* <td class="py-2 px-4 border text-right"></td> */}
                  <td class="py-2 px-4 border text-right">{totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PDFExport>
    </div>
  );
}

export default Statement;
