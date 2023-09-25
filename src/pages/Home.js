import React, { useEffect } from 'react'
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice'
import { getAllProducts } from '../features/products/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import { addToWishlist } from '../features/products/productSlice';
import banner from '../img/banner.jpg'
import smartphone from '../img/smartphone.jpg'
import laptop from '../img/laptop.jpg'
import headphones from '../img/headphones.jpg'
import shipping from '../img/truck.svg'
import bag from '../img/bag.svg'
import support from '../img/support.svg'
import returnn from '../img/return.svg'

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog)
  const productState = useSelector((state) => state.product.product)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    getblogs()
    getallProducts()
  }, [])
  const getblogs = () => {
    dispatch(getAllBlogs())
  }
  const getallProducts = () => {
    dispatch(getAllProducts())
  }

  const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Buy your <span clsas="d-block">favorite Gadgets</span></h1>
                <p className="mb-4">New Upcoming Smartphones and Laptops are available. Headphones starting from ₹ 499. Contact for more details.</p>
                <p><Link to="/product" className="btn btn-secondary shadow me-2">Shop Now</Link><Link to="/blogs" className="btn btn-white-outline">Explore</Link></p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img width={680} src="https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g435/swatches/g435-gaming-headset-gallery-2-1-black.png?v=1" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-section">
        <div className="container">
          <div className="row">

            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 className="mb-4 section-title">Upgrade your Smartphone</h2>
              <p className="mb-4">Upgrade your Smartphone, Laptops, Headphones etc.. with Affordable Price and Services Available </p>
              <p><Link to="contact" className="btn btn-primary">Contact Now</Link></p>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <a className="product-item">
                <img src={smartphone} className="img-fluid product-thumbnail rounded" />
                <h3 className="product-title">iPhones</h3>
                <strong className="product-price">From ₹49,000</strong>
              </a>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <a className="product-item">
                <img src={laptop} className="img-fluid product-thumbnail rounded" />
                <h3 className="product-title">Laptops</h3>
                <strong className="product-price">From ₹28,999</strong>
              </a>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
              <a className="product-item">
                <img src={headphones} className="img-fluid product-thumbnail rounded" />
                <h3 className="product-title">Headphones</h3>
                <strong className="product-price">From ₹499</strong>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="why-choose-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <h2 className="section-title">Why Choose Us</h2>
              <p>Why Customers Choose Us, Because we Provide Friendly Staffs and Quality Services and also 24x7 Customer Support.</p>
              <div className="row my-5">
                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src={shipping} alt="Image" className="img-fluid" />
                    </div>
                    <h3>Free Shipping</h3>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src={bag} alt="Image" className="img-fluid" />
                    </div>
                    <h3>Easy to Shop</h3>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src={support} alt="Image" className="img-fluid" />
                    </div>
                    <h3>24/7 Support</h3>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="feature">
                    <div className="icon">
                      <img src={returnn} alt="Image" className="img-fluid" />
                    </div>
                    <h3>Easy Returns</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img src={banner} alt="Image" className="img-fluid" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Marquee className='d-flex mb-5'>
        <div className='mx-4 w-25'>
          <img src="images/brand-01.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-02.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-03.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-04.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-05.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-06.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-07.png" alt="brand" />
        </div>
        <div className='mx-4 w-25'>
          <img src="images/brand-08.png" alt="brand" />
        </div>
      </Marquee>

      <div className="we-help-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 ps-lg-5">
              <h2 className="section-title mb-4 text-center">We help you to upgrade your Pc</h2>
              <p className='text-center'>Are you planning to upgrade your Pc ? Here we are , We'll Upgrade your Pc with Affordable Price and Provide High quality Products. </p>

              <ul className="list-unstyled custom-list my-4 text-center">
                <li>nvidia RTX 3050</li>
                <li>Upgrade SSD</li>
                <li>Upgrade Ram</li>
                <li>200 Hz Monitor </li>
              </ul>
              <p className='text-center'><Link to="/contact" className="btn">Connect <i className="fa-solid fa-paperclip"></i></Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home