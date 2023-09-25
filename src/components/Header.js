import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice'
import { getUserCart } from '../features/user/userSlice'
import { CiLogout } from 'react-icons/ci'

const Header = () => {
  const dispatch = useDispatch()
  const cartState = useSelector(state => state?.auth?.cartProducts)
  const authState = useSelector(state => state?.auth)
  const productState = useSelector(state => state?.product?.product)
  const [productOpt, setProductOpt] = useState([])
  const [paginate, setPaginate] = useState(true);
  const navigate = useNavigate()

  const [total, setTotal] = useState(null)
  const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json"
    }
  }

  useEffect(() => {
    dispatch(getUserCart(config2))
  }, [])
  useEffect(() => {
    let sum = 0
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
      setTotal(sum)
    }
  }, [cartState])
  useEffect(() => {
    let data = []
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title })

    }
    setProductOpt(data)
  }, [productState])

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>
      <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

        <div className="container">
          <a className="navbar-brand" href="/">Bliss <i className="fa-solid fa-cubes-stacked"></i></a>

          <Typeahead
            id="pagination-example"
            onPaginate={() => console.log('Results paginated')}
            onChange={(selected) => {
              navigate(`/product/${selected[0]?.prod}`)
              dispatch(getAProduct(selected[0]?.prod))
            }}
            options={productOpt}
            paginate={paginate}
            labelKey={"name"}
            minLength={2}
            placeholder="Search Here"
          />

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <NavLink className="nav-item active nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/product">Store</NavLink>
              <NavLink className="nav-link" to="/my-orders">Orders</NavLink>
              <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
              <NavLink style={{ color: "#FA8072" }} onClick={handleLogout} className='nav-link' type='button'>Logout <CiLogout /></NavLink>

            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <div className='me-3'>
                <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white'>
                  <div className='text-center p-1'><i className="fa-solid fa-heart fa-xl text-danger"></i></div>
                </Link>
              </div>

              <div className='me-3'>
                <Link to="/cart" className='d-flex align-items-center gap-10 text-white'>
                  <div className='text-center p-1'><i className="fa-solid fa-cart-shopping fa-xl text-warning"></i></div>
                  <div className='d-flex flex-column gap-10'>
                    <span className="badge bg-white text-dark">{cartState?.length ? cartState?.length : 0}</span>
                  </div>
                </Link>
              </div>

              <div>
                <Link to={authState?.user === null ? "/login" : "/my-profile"} className='d-flex align-items-center gap-10 text-white '>
                  <div className='text-center p-1'><i className="fa-solid fa-user fa-xl"></i></div>
                  {
                    authState?.user === null ? <p className='mb-0'>
                      Log in
                    </p> : <p className='mb-0'>
                      Welcome <span className='text-info fw-bolder'>{authState?.user?.firstname}</span>
                    </p>
                  }
                </Link>
              </div>
            </ul>
          </div>
        </div>

      </nav>
    </>
  )
}

export default Header