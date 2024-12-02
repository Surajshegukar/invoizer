
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Bell, CreditCard, DollarSign, Download, Users, Menu, Search, Cookie } from 'lucide-react'
import { useCookies } from 'react-cookie';

// Mock data for the chart
const chartData = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3200 },
  { name: 'Apr', total: 2800 },
  { name: 'May', total: 3500 },
  { name: 'Jun', total: 4000 },
]

// Mock data for recent invoices
const recentInvoices = [
  { id: '001', student: 'Alice Johnson', amount: 250, status: 'Paid' },
  { id: '002', student: 'Bob Smith', amount: 300, status: 'Pending' },
  { id: '003', student: 'Charlie Brown', amount: 200, status: 'Overdue' },
  { id: '004', student: 'Diana Ross', amount: 350, status: 'Paid' },
  { id: '005', student: 'Ethan Hunt', amount: 275, status: 'Pending' },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [cookies, setCookie] = useCookies(['user']);
  
  useEffect(() => {
    if(!cookies.user) {
      window.location.href = '/login';
    }
  }
  , []);

  return (
    <div className="flex h-screen bg-gray-100">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {/* Stats Grid */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Revenue Card */}
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-lg font-semibold text-gray-700">$45,231.89</p>
                </div>
              </div>
              {/* Invoices Issued Card */}
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">Invoices Issued</p>
                  <p className="text-lg font-semibold text-gray-700">2,350</p>
                </div>
              </div>
              {/* Pending Payments Card */}
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-lg font-semibold text-gray-700">573</p>
                </div>
              </div>
              {/* Active Students Card */}
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-lg font-semibold text-gray-700">2,234</p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid gap-6 mb-8 md:grid-cols-2">
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
                <h4 className="mb-4 font-semibold text-gray-800">Invoice Overview</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Invoices */}
              <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
                <h4 className="mb-4 font-semibold text-gray-800">Recent Invoices</h4>
                <div className="w-full mb-4">
                  <div className="relative">
                    <input
                      className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-400"
                      type="text"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                      <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                          <th className="px-4 py-3">Invoice</th>
                          <th className="px-4 py-3">Student</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {recentInvoices
                          .filter((invoice) =>
                            invoice.student.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((invoice) => (
                            <tr key={invoice.id} className="text-gray-700">
                              <td className="px-4 py-3 text-sm">{invoice.id}</td>
                              <td className="px-4 py-3 text-sm">{invoice.student}</td>
                              <td className="px-4 py-3 text-sm">${invoice.amount}</td>
                              <td className="px-4 py-3 text-xs">
                                <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${
                                  invoice.status === 'Paid' ? 'text-green-700 bg-green-100' :
                                  invoice.status === 'Pending' ? 'text-orange-700 bg-orange-100' :
                                  'text-red-700 bg-red-100'
                                }`}>
                                  {invoice.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}