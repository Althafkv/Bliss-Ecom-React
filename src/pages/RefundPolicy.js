import React from 'react'
import Container from '../components/Container'
import ESpinner from '../components/ESpinner';
import { useState } from 'react';

const RefundPolicy = () => {

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
                                <div className="policy rounded-4">
                                    <h3 className='text-center mb-3'>Refund Policy</h3>
                                    <p className='text-center'>Digital Products Return and Refund Policy</p>

                                    <p style={{ textAlign: "justify" }}>
                                        If you encountered any issues with the product or the website, the best way to ensure that your issue is noticed, resolved, and possibly refunded is to contact us via email or via our contact page.
                                        <br />
                                        Please let us know what’s going on so we can make it up to you.
                                        <hr />
                                        <br />
                                        We stand behind our products and your satisfaction with them is important to us. Because our products are digital goods delivered via the internet, in accordance with EU regulations the 14-day cooling off period does not apply, therefore we generally offer no refunds. Due to technical limitations software purchases are not refundable unless you cannot access the software or there is a defect with the content (i.e. the library zip file is broken and cannot be unpacked).
                                        <br />
                                        Before making a purchase we urge you to use and trial the free version of our software.
                                        <hr />
                                        <br />
                                        Unwanted renewals are <span className='fw-bold'>100% refundable within the first 14 days after the payment</span>, as long as you don't download the new package version covered by a new billing period.
                                        <br />
                                        Please remember that UI Kit usage is for a lifetime, but when canceling your subscription you lose access to:
                                        <br />
                                        • git repositories <br />
                                        • npm installation option <br />
                                        • premium support <br />
                                        • premium code snippets examples on our snippet platform <br />
                                        • premium components documentation examples <br />
                                        • new updates of the package <br />
                                        • LAB & snippets platform <br />
                                        • You can cancel your subscription anytime via the My Orders panel in your account.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
            }
        </>
    )
}

export default RefundPolicy