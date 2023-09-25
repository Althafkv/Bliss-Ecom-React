import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Custominput from '../components/Custominput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/user/userSlice'

const loginSchema = yup.object({
  email: yup.string().email("Email Should be Valid").required("Email is Required"),
  password: yup.string().required("Password is Required")
});

const Login = () => {
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
    },
  });
  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      // setTimeout(() => {
      //   navigate('/')
      // }, 200);
      navigate('/')
      setTimeout(() => {
        window.location.reload()
      }, 5000);
    }
  }, [authState])

  return (
    <>
      <section className="vh-90 mt-5 mb-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-outline mb-4">
                  <Custominput type="email"
                    name='email'
                    placeholder='Email'
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email} />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="form-outline mb-3">
                  <Custominput
                    type="password"
                    name='password'
                    placeholder='Password'
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/forgot-password" className="text-body">Forgot password ?</Link>
                </div>
                <div className="text-center mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-md"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                  <p className="fw-bold mt-2 pt-1 mb-0">Don't have an account ? <Link to="/signup"
                    className="link-danger">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Login