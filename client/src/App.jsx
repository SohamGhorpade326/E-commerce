import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'; // <-- IMPORT NEW PAGE
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';

const App = () => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<ProfilePage />} /> {/* <-- ADD NEW ROUTE */}
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart/:id?" element={<CartPage />} />
                        <Route path="/shipping" element={<ShippingPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/placeorder" element={<PlaceOrderPage />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default App;
