import React, { useEffect, useState } from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import blog from '../images/blog-1.jpg'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import { getABlog } from '../features/blogs/blogSlice'
import ESpinner from '../components/ESpinner'

const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleBlog)
  const location = useLocation()
  const getBlogId = location.pathname.split('/')[2]
  const dispatch = useDispatch()
  useEffect(() => {
    getblog()
  }, [])
  const getblog = () => {
    dispatch(getABlog(getBlogId))
  }

  const [showspin, setShowspin] = useState(true)

  setTimeout(() => {
    setShowspin(false)
  }, 1000);

  return (
    <>
      {
        showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
          <Container class1="blog-wrapper home-wrapper-2 py-5">
            <div className="row">
              <div className="col-12">
                <Link to="/blogs" className='d-flex align-items-center gap-10 justify-content-end'>
                  <HiOutlineArrowLeft className='fs-6' />Back to blogs</Link>
                <div className="single-blog-card">
                  <h3 className="title text-secondary text-center mb-3">
                    {blogState?.title}
                  </h3>
                  <img src={blogState?.images[0]?.url ? blogState?.images[0]?.url : ""} className='img-fluid' style={{ borderRadius: "10px", display: "block", marginLeft: "auto", marginRight: "auto", width: "50%" }} alt="blog" />
                  <p style={{ textAlign: "justify" }} className='mt-3' dangerouslySetInnerHTML={{ __html: blogState?.description }}>
                  </p>
                </div>
              </div>
            </div>
          </Container>
      }

    </>
  )
}

export default SingleBlog