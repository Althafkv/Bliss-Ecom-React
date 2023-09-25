import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { config } from '../utils/axiosConfig'
import { createAnOrder, deleteUserCart, getUserCart, resetState } from '../features/user/userSlice'

const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    address: yup.string().required("Address is Required"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City is Required"),
    country: yup.string().required("Country is Required"),
    pincode: yup.number().required("Pincode is Required"),
    other: yup.string().required("Field is Required")
});

const Checkout = () => {
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.auth.cartProducts)
    const authState = useSelector(state => state.auth)
    const [totalAmount, setTotalAmount] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null)
    console.log(shippingInfo);
    const [cartProductState, setCartProductState] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let sum = 0
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
            setTotalAmount(sum)
        }
    }, [cartState])

    const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
            Accept: "application/json"
        }
    }

    useEffect(() => {
        if (authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
            navigate("/my-orders")
        }
    }, [authState])

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
            other: ""
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            setShippingInfo(values)
            localStorage.setItem("address", JSON.stringify(values))
            setTimeout(() => {
                checkOutHandler()
            }, 300);
        },
    });

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script")
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    useEffect(() => {
        let items = []
        for (let index = 0; index < cartState?.length; index++) {
            items.push({ product: cartState[index].productId._id, quantity: cartState[index].quantity, color: cartState[index].color._id, price: cartState[index].price })
        }
        setCartProductState(items)
    }, [])

    const checkOutHandler = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK failed to Load")
            return
        }
        // const result = await axios.post("http://localhost:5000/api/user/order/checkout", { amount: totalAmount + 5 }, config)
        const result = await axios.post("https://bliss-ecom-server.onrender.com/api/user/order/checkout", { amount: totalAmount + 5 }, config)
        if (!result) {
            alert("Something Went Wrong")
            return
        }
        const { amount, id: order_id, currency } = result.data.order
        const options = {
            key: "rzp_test_qc0XS1KcTr70sL", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Bliss",
            description: "Test Transaction",

            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                // const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);
                const result = await axios.post("https://bliss-ecom-server.onrender.com/api/user/order/paymentVerification", data, config);

                dispatch(createAnOrder({ totalPrice: totalAmount, totalPriceAfterDiscount: totalAmount, orderItems: cartProductState, paymentInfo: result.data, shippingInfo: JSON.parse(localStorage.getItem("address")) }))
                dispatch(deleteUserCart(config2))
                localStorage.removeItem("address")
                dispatch(resetState())
            },
            prefill: {
                name: "Bliss",
                email: "Bliss@gmail.com",
                contact: "7902360099",
            },
            notes: {
                address: "Developers BlissOffice",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            <div className="row p-3 mt-4">
                <div className="col-md-8 mb-4">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0 text-secondary">Shipping Address</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="text" placeholder='First Name' className="form-control" name='firstName' value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")} />
                                            <div className="error ms-2 my-1">
                                                {formik.touched.firstName && formik.errors.firstName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="text" placeholder='Last Name' className="form-control" name='lastName' value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")} />
                                            <div className="error ms-2 my-1">
                                                {formik.touched.lastName && formik.errors.lastName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} id="" className="form-control form-select">
                                        <option value="" selected disabled>Select Country</option>
                                        <option value="India">India</option>
                                        <option value="France">France</option>
                                        <option value="Canada">Canada</option>
                                        <option value="China">China</option>
                                        <option value="Australia">Australia</option>
                                        <option value="United State">United State</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Austria">Austria</option>
                                    </select>
                                    <div className="error ms-2 my-1">
                                        {formik.touched.country && formik.errors.country}
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" placeholder='Address' className="form-control" name='address' value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")} />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" placeholder='Apartment / Flat no' className="form-control" name='other' value={formik.values.other} onChange={formik.handleChange("other")} onBlur={formik.handleBlur("other")} />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.other && formik.errors.other}
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" placeholder='City' className="form-control" name='city' value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")} />
                                    <div className="error ms-2 my-1">
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <select name='state' value={formik.values.state} onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")} id="" className="form-control form-select">
                                                <option value="" selected disabled>
                                                    Select State
                                                </option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Tamilnadu">Tamilnadu</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Delhi">Delhi</option>
                                            </select>
                                            <div className="error ms-2 my-1">
                                                {formik.touched.state && formik.errors.state}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="text" placeholder='Pincode' className="form-control" name='pincode' value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")} />
                                            <div className="error ms-2 my-1">
                                                {formik.touched.pincode && formik.errors.pincode}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <Link to="/cart" className='text-dark fw-bold text-primary'>
                                        Return to Cart
                                    </Link>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0 text-secondary">Summary</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Subtotal
                                    <span>$ {totalAmount ? totalAmount : "0"}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>$ 5</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Total Amount</strong>
                                    </div>
                                    <span><strong>$ {totalAmount ? totalAmount + 5 : "0"}</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout