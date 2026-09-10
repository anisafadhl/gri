import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Connect } from './pages/Connect';
import { Mission } from './pages/Mission';
import { Services } from './pages/Services';
import { Ministries } from './pages/Ministries';
import { Campuses } from './pages/Campuses';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Admin } from './pages/Admin';
import { Yayasan } from './pages/Yayasan';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  return null;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="font-sans text-neutral-900 bg-[#fbf9f5] min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/yayasan" element={<Yayasan />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

