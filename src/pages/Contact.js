import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { createQuery } from '../features/contact/contactSlice'
import ESpinner from '../components/ESpinner'

const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup.string().nullable().email("Email should be valid").required("Email is Required"),
  mobile: yup.string().default('').nullable().required("Mobile is Required"),
  comment: yup.string().default('').nullable().required("Comment is Required")
})


const Contact = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      comment: ''
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery({ name: values.name, email: values.email, mobile: values.mobile, comment: values.comment }))
    },
  });

  const [showspin, setShowspin] = useState(true)

  setTimeout(() => {
    setShowspin(false)
  }, 1000);

  return (
    <>
      {
        showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
          <section className="vh-90 mt-5 mb-5">
            <div className="container-fluid h-custom">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className='ps-0 mb-5'>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineHome className='fs-5' />
                        <address className='mb-0'>Hno:123 , Near Ab Street , Ernakulam, Kerala , India</address>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiPhoneCall className='fs-5' />
                        <a href="tel:+91 7902360099">+91 7902360099</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineMail className='fs-5' />
                        <a href="mailto:althafwayanad@gmail.com">althafwayanad@gmail.com</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiInfoCircle className='fs-5' />
                        <p className='mb-0'>Monday - Friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form onSubmit={formik.handleSubmit}>
                    <h3 className="contact-title mb-4">Contact</h3>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Name'
                        name='name'
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Email'
                        name='email'
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Mobile Number'
                        name='mobile'
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                        value={formik.values.mobile}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>

                    <div className="form-outline mb-3">
                      <textarea
                        id=""
                        className='w-100 form-control'
                        cols="30"
                        rows="4"
                        placeholder='Comments'
                        name='comment'
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      ></textarea>
                      <div className="error">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <div className="text-end mt-4 pt-2">
                      <button className="btn btn-primary"
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Submit</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 mt-5">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251491.33462831506!2d76.14347582612976!3d9.971172356834197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d08f976f3a9%3A0xe9cdb444f06ed454!2sErnakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1691995639557!5m2!1sen!2sin" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </section>
      }
    </>
  )
}

export default Contact