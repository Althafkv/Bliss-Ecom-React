import React, { useState } from 'react'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../features/user/userSlice'
import { FiEdit } from 'react-icons/fi'
import ESpinner from '../components/ESpinner'

const profileSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name is Required"),
    email: yup.string().email("Email Should be Valid").required("Email is Required"),
    mobile: yup.string().required("Mobile Number is Required"),
});


const Profile = () => {
    const getTokenFromLocalStorage = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
            Accept: "application/json"
        }
    }
    const dispatch = useDispatch()
    const userState = useSelector(state => state.auth.user)
    const [edit, setEdit] = useState(true)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile({ data: values, config2: config2 }))
            setEdit(true)
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
                    <Container class1='cart-wrapper home-wrapper py-5'>
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className='my-3'>Update Profile <i className="fa-solid fa-user-pen"></i></h3>
                                    <FiEdit className='cur fs-4 text-primary' onClick={() => setEdit(false)} />
                                </div>
                            </div>
                            <div className="col-12">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="example1" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            name='firstname'
                                            className="form-control"
                                            id="example1"
                                            disabled={edit}
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange('firstname')}
                                            onBlur={formik.handleBlur('firstname')}
                                        />
                                        <div className="error">
                                            {formik.touched.firstname && formik.errors.firstname}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="example2" className="form-label">Last Name</label>
                                        <input type="text" name='lastname' disabled={edit} className="form-control" id="example2" value={formik.values.lastname}
                                            onChange={formik.handleChange('lastname')}
                                            onBlur={formik.handleBlur('lastname')} />
                                        <div className="error">
                                            {formik.touched.lastname && formik.errors.lastname}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" name='email' disabled={edit} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formik.values.email}
                                            onChange={formik.handleChange('email')}
                                            onBlur={formik.handleBlur('email')} />
                                        <div className="error">
                                            {formik.touched.email && formik.errors.email}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail2" className="form-label">Mobile Number</label>
                                        <input type="number" name='mobile' disabled={edit} className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" value={formik.values.mobile}
                                            onChange={formik.handleChange('mobile')}
                                            onBlur={formik.handleBlur('mobile')} />
                                        <div className="error">
                                            {formik.touched.mobile && formik.errors.mobile}
                                        </div>
                                    </div>
                                    {
                                        edit == false && <button type="submit" className="btn btn-primary">Save</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </Container>
            }

        </>
    )
}

export default Profile