import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import Color from '../components/Color';
import Container from '../components/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import { GlassMagnifier } from "react-image-magnifiers";
import ESpinner from '../components/ESpinner';

const SingleProduct = () => {
    const [color, setColor] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [alreadyAdded, setAlreadyAddded] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const getProductId = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const productState = useSelector(state => state?.product?.singleproduct)
    const productsState = useSelector(state => state?.product?.product)
    const cartState = useSelector(state => state?.auth?.cartProducts)
    useEffect(() => {
        dispatch(getAProduct(getProductId))
        // dispatch(getUserCart())
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAddded(true)
            }
        }
    }, [])

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please Choose a Color")
            return false
        } else {
            dispatch(addProdToCart({ productId: productState?._id, quantity, color, price: productState?.price }))
            setTimeout(() => {
                navigate('/cart')
            }, 1000);
        }
    }

    const props = { width: 400, height: 600, zoomWidth: 600, img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://img" };

    const [orderedProduct, setOrderedProduct] = useState(true)

    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        toast.success("Product Link Copied")
    }

    const [popularProduct, setPopularProduct] = useState([])
    useEffect(() => {
        let data = []
        for (let index = 0; index < productsState?.length; index++) {
            const element = productsState[index];
            if (element.tags === 'popular') {
                data.push(element)
            }
            setPopularProduct(data)
        }
    }, [productState])

    const [star, setStar] = useState(null)
    const [comment, setComment] = useState(null)
    const addRatingToProduct = () => {
        if (star === null) {
            toast.error("Please add star rating")
            return false
        } else if (comment === null) {
            toast.error("Please Write Review")
            return false
        } else {
            dispatch(addRating({ star: star, comment: comment, prodId: getProductId }))
            setTimeout(() => {
                dispatch(getAProduct(getProductId))
            }, 1000);
        }
        return false
    }

    const onLoad = () => {
        console.log("inside load");
    }

    const [showspin, setShowspin] = useState(true)

    setTimeout(() => {
        setShowspin(false)
    }, 1000);

    return (
        <>
            {
                showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
                    <section className="py-1">

                        <div className="container px-4 px-lg-5 my-5">

                            <div className="row gx-4 gx-lg-5 align-items-center">
                                <Link to="/product" className='text-end text-primary'>🡠 Go Back</Link>

                                {
                                    productState?.images.map((item, index) => {
                                        return (
                                            <div key={index} className="col-md-6">
                                                <GlassMagnifier
                                                    style={{ borderRadius: "5%" }}
                                                    className="card-img-top mb-5 mb-md-0 shadow"
                                                    imageSrc={item?.url}
                                                    imageAlt="img"
                                                    onImageLoad={() => onLoad()}
                                                    magnifierSize="40%"
                                                />
                                            </div>
                                        )
                                    })
                                }

                                <div className="col-md-6">
                                    <h1 className="display-6 fw-bolder mb-3">{productState?.title}</h1>
                                    <div className="fs-5 mb-3">
                                        <p className="price fw-bolder text-black">$ {productState?.price}</p>
                                    </div>

                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Brand :</h3>
                                        <p className='product-data'>{productState?.brand}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Category :</h3>
                                        <p className='product-data'>{productState?.category}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Tags :</h3>
                                        <p className='product-data'>{productState?.tags}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Availablity :</h3>
                                        <p className='product-data'>In Stock</p>
                                    </div>

                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>Product Link :</h3>
                                        <a className='text-secondary' href="javascript:void(0);" onClick={() => {
                                            copyToClipboard(
                                                window.location.href
                                            )
                                        }}>
                                            Copy Product Link
                                        </a>
                                    </div>

                                    {
                                        alreadyAdded === false && <>
                                            <div className='d-flex gap-10 flex-column mt-2 mb-2'>
                                                <h3 className='product-heading mb-2'>Colors :</h3>
                                                <div style={{ cursor: "pointer" }}><Color setColor={setColor} colorData={productState?.color} /></div>
                                            </div>
                                        </>
                                    }

                                    <div className='d-flex gap-10 flex-column my-2'>
                                        <p className='product-data'>
                                            Fast Shipping and returns available on all orders <br />
                                            We Ship all orders within
                                            <b> 7-16 business days</b>
                                        </p>
                                    </div>


                                    <div className='d-flex align-items-center gap-15 flex-row mt-3 mb-3'>
                                        {
                                            alreadyAdded === false && <>
                                                <h3 className='product-heading'>Quantity :</h3>
                                                <div>
                                                    <input
                                                        type="number"
                                                        name=''
                                                        min={1}
                                                        max={10}
                                                        className='form-control'
                                                        style={{ "width": "70px" }}
                                                        id=''
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        value={quantity}
                                                    />
                                                </div>
                                            </>
                                        }
                                        <div className={alreadyAdded ? "ms-0" : "ms-5" + 'd-flex align-items-center gap-30 ms-5'}>
                                            <button
                                                className='btn btn-primary'
                                                type='button'
                                                onClick={() => { alreadyAdded ? navigate('/cart') : uploadCart() }}
                                            >
                                                {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Container class1="description-wrapper py-5 home-wrapper-2">
                            <div className="row">
                                <div className="col-12">
                                    <h4 className='text-secondary'>Description</h4>
                                    <div className='bg-white p-3 rounded'>
                                        <p dangerouslySetInnerHTML={{ __html: productState?.description }}>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Container class1="reviews-wrapper home-wrapper-2">
                            <div className="row">
                                <div className="col-12">
                                    <h3 id='review' className='text-secondary'>Reviews</h3>
                                    <div className="review-inner-wrapper rounded mb-5">
                                        <div className="review-head d-flex justify-content-between align-items-end">
                                            <div>
                                                <h4 className='mb-2'>Customer Review</h4>
                                            </div>
                                            {
                                                orderedProduct && (
                                                    <div>
                                                        <Link className='text-dark text-decoration-none'>Write a Review</Link>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="review-form py-4">
                                            <h4>Write a Review</h4>
                                            <div>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={4}
                                                    edit={true}
                                                    activeColor="#ffd700"
                                                    onChange={(e) => { setStar(e) }}
                                                />
                                            </div>

                                            <div className='mt-3'>
                                                <textarea name="" id="" className='w-100 form-control' cols="30" rows="4" placeholder='Comments' onChange={(e) => { setComment(e.target.value) }}></textarea>
                                            </div>
                                            <div className='d-flex justify-content-end mt-3'>
                                                <button onClick={addRatingToProduct} className="btn btn-primary border-0" type='button'>Submit</button>
                                            </div>
                                        </div>
                                        <div className="reviews mt-4">
                                            {
                                                productState && productState.ratings?.map((item, index) => {
                                                    return (
                                                        <div key={index} className="review">
                                                            <div className="d-flex gap-10 align-items-center">
                                                                <ReactStars
                                                                    count={5}
                                                                    size={24}
                                                                    value={item?.star}
                                                                    edit={false}
                                                                    activeColor="#ffd700"
                                                                />
                                                            </div>
                                                            <p className='mt-3'>
                                                                {item?.comment}
                                                            </p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </section>
            }
        </>
    )
}

export default SingleProduct