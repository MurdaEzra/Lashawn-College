import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { DrivingCourses } from './pages/DrivingCourses';
import { ComputerCourses } from './pages/ComputerCourses';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Booking } from './pages/Booking';
import { Fees } from './pages/Fees';
export function AppRouter() {
  return <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/driving-courses" element={<DrivingCourses />} />
          <Route path="/computer-courses" element={<ComputerCourses />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/fees" element={<Fees />} />
        </Routes>
      </Layout>
    </BrowserRouter>;
}