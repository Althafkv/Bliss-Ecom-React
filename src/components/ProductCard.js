import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';
import { toast } from 'react-toastify';


const ProductCard = (props) => {
    const { grid, data } = props
    const dispatch = useDispatch()
    let location = useLocation()
    const addToWish = (id) => {
        dispatch(addToWishlist(id))
        toast.success("Added to wishlist")
    }

    return (
        <>
            <section>
                <div className="text-center container py-5">
                    <div className="row">
                        {
                            data?.map((item, index) => {
                                return (
                                    <div key={index} className="col-lg-4 col-md-12 mb-4">
                                        <div className="card shadow rounded" style={{ overflow: "hidden" }}>
                                            <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                                data-mdb-ripple-color="light">
                                                <img src={item?.images[0].url}
                                                    className="w-100" />
                                                <a href="#!">
                                                    <div className="mask">
                                                        <div className="d-flex justify-content-start align-items-end h-100">
                                                            <h6><span className="badge bg-primary ms-2">{item?.brand}</span></h6>
                                                        </div>
                                                    </div>
                                                    <div className="hover-overlay">
                                                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <a className="text-reset">
                                                    <h6 className="product-title">
                                                        {item?.title}
                                                    </h6>
                                                </a>
                                                <h6 className="mb-3 fw-bold">₹ {item?.price}</h6>
                                                <div className='d-flex justify-content-center'>
                                                    <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id) }}>
                                                        <i className="fa-solid fa-heart fa-xl text-danger me-3"></i>
                                                    </button>
                                                    <Link to={'/product/' + item?._id} className='border-0 bg-transparent'>
                                                        <i className="fa-solid fa-eye fa-xl text-warning"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductCard