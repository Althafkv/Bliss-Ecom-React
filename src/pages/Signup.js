import React, { useEffect } from 'react'
import Custominput from '../components/Custominput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const signUpSchema = yup.object({
  firstname: yup.string().required("First name is Required"),
  lastname: yup.string().required("Last name is Required"),
  email: yup.string().email("Email Should be Valid").required("Email is Required"),
  mobile: yup.string().required("Mobile No is Required"),
  password: yup.string().required("Password is Required")
});

const Signup = () => {
  const authState = useSelector(state => state?.auth?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: ""
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values))
    },
  });
  useEffect(() => {
    if (authState?.createdUser !== null && authState?.isError === false) {
      navigate('/login')
    }
  }, [authState])

  return (
    <>
      <section className="vh-70 p-4" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <form onSubmit={formik.handleSubmit} className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Custominput
                              type="text"
                              name='firstname'
                              placeholder='First Name'
                              value={formik.values.firstname}
                              onChange={formik.handleChange("firstname")}
                              onBlur={formik.handleBlur("firstname")}
                            />
                            <div className="error">
                              {formik.touched.firstname && formik.errors.firstname}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Custominput
                              type="text"
                              name='lastname'
                              placeholder='Last Name'
                              value={formik.values.lastname}
                              onChange={formik.handleChange("lastname")}
                              onBlur={formik.handleBlur("lastname")}
                            />
                            <div className="error">
                              {formik.touched.lastname && formik.errors.lastname}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Custominput
                              type="email"
                              name='email'
                              placeholder='Email Address'
                              value={formik.values.email}
                              onChange={formik.handleChange("email")}
                              onBlur={formik.handleBlur("email")}
                            />
                            <div className="error">
                              {formik.touched.email && formik.errors.email}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Custominput
                              type="tel"
                              name='mobile'
                              placeholder='Mobile Number'
                              value={formik.values.mobile}
                              onChange={formik.handleChange("mobile")}
                              onBlur={formik.handleBlur("mobile")}
                            />
                            <div className="error">
                              {formik.touched.mobile && formik.errors.mobile}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Custominput
                              type="password"
                              name='password'
                              placeholder='Password'
                              value={formik.values.password}
                              onChange={formik.handleChange("password")}
                              onBlur={formik.handleBlur("password")}
                            />
                            <div className="error">
                              {formik.touched.password && formik.errors.password}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup