import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice'
import ESpinner from '../components/ESpinner'

const Cart = () => {
    const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
            Accept: "application/json"
        }
    }

    const dispatch = useDispatch()
    const [productUpdateDetail, setProductUpdateDetail] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const userCartState = useSelector(state => state.auth.cartProducts)

    useEffect(() => {
        dispatch(getUserCart(config2))
    }, [])
    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateCartProduct({ cartItemId: productUpdateDetail?.cartItemId, quantity: productUpdateDetail?.quantity }))
            setTimeout(() => {
                dispatch(getUserCart(config2))
            }, 1000);
        }
    }, [productUpdateDetail])

    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct({ id: id, config2: config2 }))
        setTimeout(() => {
            dispatch(getUserCart(config2))
        }, 1000);
    }

    useEffect(() => {
        let sum = 0
        for (let index = 0; index < userCartState?.length; index++) {
            sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
            setTotalAmount(sum)
        }
    }, [userCartState])

    const [showspin, setShowspin] = useState(true)

    setTimeout(() => {
        setShowspin(false)
    }, 1000);

    return (
        <>
            {
                showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
                    <section className="h-100" style={{ "backgroundColor": "#eee" }}>
                        <div className="container h-100 py-5">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-10">
                                    {
                                        userCartState && userCartState?.length === 0 && <div className='text-center fs-3'><img src="https://i.ibb.co/9YqzwhV/output-onlinegiftools.gif" alt="output-onlinegiftools" /></div>
                                    }
                                    {
                                        userCartState && userCartState?.map((item, index) => {
                                            return (
                                                <div key={index} className="card rounded-3 mb-4 shadow">
                                                    <div className="card-body p-4">
                                                        <div className="row d-flex justify-content-between align-items-center">

                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img
                                                                    src={item?.productId?.images[0]?.url}
                                                                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <p className="lead fw-normal mb-2">{item?.productId.title.slice(0, 18)}...</p>
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                                <input className='form-control' type="number" name={"quantity" + item?._id} min={1} max={10} id={"cart" + item?._id} value={item?.quantity} onChange={(e) => { setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value }) }} />
                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h5 className="mb-0 mt-2">$ {item?.price * item?.quantity}</h5>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <a onClick={() => { deleteACartProduct(item?._id) }} className="text-danger dltcart"><i className="fas fa-trash fa-lg"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="card">
                                        <div className="card-body">
                                            {
                                                (totalAmount !== null || totalAmount !== 0) &&
                                                <div className='d-flex flex-column align-items-end'>
                                                    <h4>Total: $ {totalAmount}</h4>
                                                    <p>Taxes and shipping calculated at checkout</p>
                                                    <Link to="/checkout" className='btn btn-primary'>Checkout</Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className='text-end mt-3 fw-bold'><Link className='text-secondary' to="/product">Continue to Shopping <i className="fa-brands fa-shopify fa-lg"></i></Link></div>

                                </div>
                            </div>
                        </div>
                    </section>
            }

        </>
    )
}

export default Cart