import React from 'react'
import Container from '../components/Container'
import { useState } from 'react';
import ESpinner from '../components/ESpinner';

const ShippingPolicy = () => {

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
                                    <h3 className='text-center'>Shipping Policy</h3>
                                    <p className='text-center'>Shipping</p>
                                    <p style={{ textAlign: "justify" }}>

                                        <span className='fw-bold'>What are the delivery charges?</span> <br />

                                        Delivery charge varies with each Seller.

                                        Sellers incur relatively higher shipping costs on low value items. In such cases, charging a nominal delivery charge helps them offset logistics costs. Please check your order summary to understand the delivery charges for individual products.

                                        For Products listed as Bliss Plus, a Rs 40 charge for delivery per item may be applied if the order value is less than Rs 500. While, orders of Rs 500 or above are delivered free.
                                        <br />
                                        <hr />

                                        <span className='fw-bold'>Why does the delivery date not correspond to the delivery timeline of X-Y business days?</span>
                                        <br />

                                        It is possible that the Seller or our courier partners have a holiday between the day your placed your order and the date of delivery, which is based on the timelines shown on the product page. In this case, we add a day to the estimated date. Some courier partners and Sellers do not work on Sundays and this is factored in to the delivery dates.
                                        <br />
                                        <hr />

                                        <span className='fw-bold'>What is the estimated delivery time?</span> <br />

                                        Sellers generally procure and ship the items within the time specified on the product page. Business days exclude public holidays and Sundays.
                                        <br />
                                        <hr />

                                        <span className='fw-bold'>Estimated delivery time depends on the following factors :</span> <br />

                                        • The Seller offering the product <br />
                                        • Product's availability with the Seller <br />
                                        • The destination to which you want the order shipped to and location of the Seller. <br />
                                        <hr />
                                        <span className='fw-bold'>Are there any hidden costs (sales tax, octroi etc) on items sold by Sellers on Bliss?</span> <br />

                                        There are NO hidden charges when you make a purchase on Bliss. List prices are final and all-inclusive. The price you see on the product page is exactly what you would pay.

                                        Delivery charges are not hidden charges and are charged (if at all) extra depending on the Seller's shipping policy. <br />
                                        <hr />

                                        <span className='fw-bold'>Why does the estimated delivery time vary for each seller?</span> <br />

                                        You have probably noticed varying estimated delivery times for sellers of the product you are interested in. Delivery times are influenced by product availability, geographic location of the Seller, your shipping destination and the courier partner's time-to-deliver in your location.

                                        Please enter your default pin code on the product page (you don't have to enter it every single time) to know more accurate delivery times on the product page itself.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
            }

        </>
    )
}

export default ShippingPolicy