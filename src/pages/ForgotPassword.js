import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Custominput from '../components/Custominput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordToken } from '../features/user/userSlice'

const emailSchema = yup.object({
    email: yup.string().email("Email Should be Valid").required("Email is Required"),
});

const ForgotPassword = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: emailSchema,
        onSubmit: (values) => {
            dispatch(forgotPasswordToken(values))

        },
    });

    return (
        <>
            <section className="vh-90 mt-5 mb-5">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">

                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={formik.handleSubmit}>

                                <h3 className='text-center mb-3'>Reset your password</h3>
                                <p className="text-center mt-2 mb-3">
                                    We will send you an email to reset your password
                                </p>
                                <div className="form-outline mb-4">
                                    <Custominput
                                        type="email"
                                        name='email'
                                        placeholder='Email Address'
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                        value={formik.values.email}
                                    />
                                    <div className="error text-center mt-2">
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                </div>
                                <div className="text-center mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Submit</button>
                                    <p className='mt-2'> <Link to="/login">Cancel</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword