import React from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
// We will need to create an orderSlice for this part later
// For now, we'll log to console

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    // Calculate prices
    const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const placeOrderHandler = () => {
        // Here you would dispatch an action to create the order
        console.log('Order placed!');
        // dispatch(createOrder({...}))
        // navigate('/order/ORDER_ID');
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                                                <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                                                <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
                            <ListGroup.Item><Row><Col>Items</Col><Col>${cart.itemsPrice}</Col></Row></ListGroup.Item>
                            <ListGroup.Item><Row><Col>Shipping</Col><Col>${cart.shippingPrice}</Col></Row></ListGroup.Item>
                            <ListGroup.Item><Row><Col>Tax</Col><Col>${cart.taxPrice}</Col></Row></ListGroup.Item>
                            <ListGroup.Item><Row><Col>Total</Col><Col>${cart.totalPrice}</Col></Row></ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='w-100' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderPage;
