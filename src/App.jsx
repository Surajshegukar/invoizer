import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Invoice from './pages/Invoice'
import Items from './pages/Items'
import NotFound from './pages/NotFound'
import ShowInvoices from './pages/ShowInvoices'
import NavSideBar from './components/NavSideBar'
import Footer from './components/Footer'
import Student from './pages/Student'
import StuProfile from './pages/StuProfile'
import Statement from './pages/Statement'


function App() {
  

  return (
    <>
      <Router>
        <NavSideBar />
        <Routes>
          <Route path="/home" element={<Dashboard />} />
          <Route path = '/' element = {<Dashboard />} />
          <Route path="/add-invoice" element={<Invoice />} />
          <Route path="/show-invoices" element={<ShowInvoices />} />
          <Route path = "/add-items" element = {<Items />} />
          <Route path = "/student" element = {<Student />} />
          <Route path = "/student-profile" element = {<StuProfile />} />
          <Route path = "/statements" element = {<Statement />} />
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
