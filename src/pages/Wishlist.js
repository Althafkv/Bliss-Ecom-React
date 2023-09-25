import React, { useEffect } from 'react'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ESpinner from '../components/ESpinner';
import { useState } from 'react';

const Wishlist = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        getWishlistFromDb()
    }, [])
    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist())
    }
    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist)
    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id))
        toast.success("Removed")
        setTimeout(() => {
            dispatch(getUserProductWishlist())
        }, 1000);
    }

    const [showspin, setShowspin] = useState(true)

    setTimeout(() => {
        setShowspin(false)
    }, 1000);

    return (
        <>
            {
                showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
                    <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                        <div className="row">
                            {
                                wishlistState && wishlistState?.length === 0 && <div className='text-center fs-3'><img src="https://i.ibb.co/9YqzwhV/output-onlinegiftools.gif" alt="output-onlinegiftools" /></div>
                            }
                            {
                                wishlistState && wishlistState?.map((item, index) => {
                                    return (
                                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={index}>
                                            <div className="wishlist-card position-relative">
                                                <div className="wishlist-card-image rounded p-3">
                                                    <img style={{ borderRadius: "10px" }} src={item?.images[0].url ? item?.images[0].url : "images/watch.jpg"} className='img-fluid d-block mx-auto shadow' alt="watch" width={200} />
                                                </div>
                                                <div className="py-3 px-3">
                                                    <h5 className="title text-center">{item?.title}</h5>
                                                    <h6 className="price text-center">$ {item?.price}</h6>

                                                    <div className='text-center'>
                                                        <Link to={'/product/' + item?._id} className='border-0 bg-transparent text-warning fw-bold'>
                                                            <i className="fa-solid fa-eye fa-lg me-3"></i>
                                                        </Link>
                                                        <Link onClick={() => { removeFromWishlist(item?._id) }} className='fw-bold text-danger'><i className="fa-solid fa-trash fa-lg"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Container>
            }

        </>
    )
}

export default Wishlist

