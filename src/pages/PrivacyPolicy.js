import React from 'react'
import Container from '../components/Container'
import ESpinner from '../components/ESpinner'
import { useState } from 'react'

const PrivacyPolicy = () => {

    const [showspin, setShowspin] = useState(true)

    setTimeout(() => {
        setShowspin(false)
    }, 1000);

    return (
        <>
            {
                showspin ? <div style={{ margin: "284px" }}><ESpinner /></div> :
                    <Container class1="policy-wrapper py-5 home-wrapper-2">
                        <div className="row">
                            <div className="col-12">
                                <div className="policy">
                                    <h3 className='text-center mb-3'>Privacy Notice</h3>
                                    <p style={{ textAlign: "justify" }}>
                                        We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This Privacy Notice describes how Bliss Seller Services Private Limited and its affiliates including Bliss.com, Inc. (collectively "Bliss") collect and process your personal information through Bliss websites, devices, products, services, online marketplace and applications that reference this Privacy Notice (together "Bliss Services").

                                        By using Bliss Services you agree to our use of your personal information (including sensitive personal information) in accordance with this Privacy Notice, as may be amended from time to time by us at our discretion. You also agree and consent to us collecting, storing, processing, transferring, and sharing your personal information (including sensitive personal information) with third parties or service providers for the purposes set out in this Privacy Notice.

                                        Personal information subject to this Privacy Notice will be collected and retained by Bliss, with a registered office at 8th floor, ABC Gateway 26/1 Street Road Ernakulam Kerala India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
            }

        </>
    )
}

export default PrivacyPolicy