import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import PressPage from './pages/PressPage';
import CateringPage from './pages/CateringPage';

import ContactPage from './pages/ContactPage';
import SweetBoxPage from './pages/SweetBoxPage';
import LiveStationsPage from './pages/LiveStationsPage';
import TrayOrdersPage from './pages/TrayOrdersPage';
import ProductDetail from './ProductDetail';
import ScrollToTop from './components/ScrollToTop';
import WelcomeScreen from './components/WelcomeScreen';

import AdminPanel from './pages/AdminPanel';

function AppRouter() {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    return (
        <div className="app">
            <WelcomeScreen />
            <ScrollToTop />
            {!isAdminPage && <Header />}
            <main className={isAdminPage ? 'admin-main-wrapper' : ''}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/articles" element={<PressPage />} />
                    <Route path="/catering" element={<CateringPage />} />

                    <Route path="/sweet-box" element={<SweetBoxPage />} />
                    <Route path="/live-stations" element={<LiveStationsPage />} />
                    <Route path="/tray-orders" element={<TrayOrdersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </main>
            {!isAdminPage && <Footer />}
        </div>
    );
}

export default AppRouter;
