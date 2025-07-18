import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
    const navigate = useNavigate();
    const { shippingAddress } = useSelector((state) => state.cart);

    if (!shippingAddress) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                            {/* Add other payment methods like Stripe here */}
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='mt-3'>Continue</Button>
                </Form>
            </Col>
        </Row>
    );
};

export default PaymentPage;