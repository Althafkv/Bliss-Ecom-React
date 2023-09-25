import React, { useEffect } from 'react'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/user/userSlice'
import ESpinner from '../components/ESpinner'
import { useState } from 'react'

const Orders = () => {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state?.auth?.getorderedProduct?.getorders)

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const [showspin, setShowspin] = useState(true)

    setTimeout(() => {
        setShowspin(false)
    }, 1000);

    return (
        <>
            {
                showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
                    <Container class1='cart-wrapper home-wrapper py-5'>
                        <div className="row">
                            <div className="col-12">
                                <div className='row'>
                                    <div className="col-3">
                                        <h5>Order Id</h5>
                                    </div>
                                    <div className="col-3">
                                        <h5>Total</h5>
                                    </div>
                                    <div className="col-3">
                                        <h5>Discount</h5>
                                    </div>
                                    <div className="col-3">
                                        <h5>Status</h5>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 mt-3">
                                {
                                    orderState && orderState?.map((item, index) => {
                                        return (
                                            <div style={{ backgroundColor: "#3b5d50" }} className='row pt-3 my-3 text-white rounded' key={index}>
                                                <div className="col-3">
                                                    <p>{item?._id}</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item?.totalPrice}</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item?.totalPriceAfterDiscount}</p>
                                                </div>
                                                <div className="col-3">
                                                    <p>{item?.orderStatus}</p>
                                                </div>
                                                <div className="col-12">
                                                    <div className="row py-3 rounded shadow" style={{ backgroundColor: "#1A1110" }}>
                                                        <div className="col-3">
                                                            <h6 className='text-white'>Product Name</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6 className='text-white'>Quantity</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6 className='text-white'>Price</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6 className='text-white'>Status</h6>
                                                        </div>
                                                        {
                                                            item?.orderItems?.map((i, index) => {
                                                                return (
                                                                    <div className="col-12" key={index}>
                                                                        <div className="row py-3">
                                                                            <div className="col-3">
                                                                                <p className='text-white'>{i?.product.title}</p>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <p className='text-white'>{i?.quantity}</p>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <p className='text-white'>{i?.price}</p>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <p>{item?.orderStatus}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Container>
            }

        </>

    )
}

export default Orders