import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice'
import moment from 'moment'
import ESpinner from '../components/ESpinner';

const Blog = () => {
    const blogState = useSelector((state) => state?.blog?.blog)

    const dispatch = useDispatch()
    useEffect(() => {
        getblogs()
    }, [])
    const getblogs = () => {
        dispatch(getAllBlogs())
    }

    const [showspin, setShowspin] = useState(true)

    setTimeout(() => {
        setShowspin(false)
    }, 1000);


    return (
        <>
            {
                showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {
                                    blogState && blogState?.length === 0 && <div className='text-center p-5 fw-bold'>No Blogs Available <i className="fa-solid fa-triangle-exclamation fa-fade text-danger"></i></div>
                                }
                                {
                                    blogState && blogState?.map((item, index) => {
                                        return (
                                            <div className="" key={index}>
                                                <BlogCard
                                                    id={item?._id}
                                                    title={item?.title}
                                                    description={item?.description}
                                                    image={item?.images[0]?.url}
                                                    date={moment(item?.createdAt).format(
                                                        "MMMM Do YYYY, h:mm a"
                                                    )}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Blog