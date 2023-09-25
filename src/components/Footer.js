import React from 'react'
import { Link } from 'react-router-dom'
import env from '../img/envelope-outline.svg'

const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="container relative">

          <div className="row g-5 mb-5">
            <div className="col-lg-4">
              <div className="mb-4 footer-logo-wrap"><Link to="/" className="footer-logo">Bliss <i className="fa-solid fa-cubes-stacked"></i></Link></div>
              <a href="mailto:althafwayanad@gmail.com">althafwayanad@gmail.com</a>
              <p className=""><a>+91 7902360099</a></p>

              <p className="mb-4"></p>

              <ul className="list-unstyled custom-social">
                <li><a className='me-2' target='_blank' href="https://www.linkedin.com/in/althafkv/"><span className="fa fa-brands fa-linkedin"></span></a></li>
                <li><a className='me-2' target='_blank' href="https://github.com/Althafkv"><span className="fa fa-brands fa-github"></span></a></li>
                <li><a className='me-2' target='_blank' href="https://wa.link/nir1fr"><span className="fa fa-brands fa-whatsapp"></span></a></li>
                <li><a className='me-2' target='_blank' href="https://www.instagram.com/althaf._.muhd/"><span className="fa fa-brands fa-instagram"></span></a></li>

              </ul>
            </div>

            <div className="col-lg-8">
              <div className="row links-wrap">
                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><Link to="/contact">Contact us</Link></li>
                    <li><Link to="/blogs">Blog</Link></li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><Link to="/refund-policy">Refund Policy</Link></li>
                    <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><Link to="/product">My Store</Link></li>
                    <li><Link to="/my-orders">My Orders</Link></li>
                  </ul>
                </div>

                <div className="col-6 col-sm-6 col-md-3">
                  <ul className="list-unstyled">
                    <li><Link to="/wishlist">Wishlist</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-top copyright">
            <div className="row pt-4">
              <div className="col-lg-6">
                <p className="mb-2 text-center text-lg-start">Copyright &copy; All Rights Reserved @ Bliss - 2023
                </p>
              </div>

              <div className="col-lg-6 text-center text-lg-end">
                <ul className="list-unstyled d-inline-flex ms-auto">
                  <li className="me-4"><Link to="/term-condition">Terms &amp; Conditions</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer