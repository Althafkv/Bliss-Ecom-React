import React, { useState } from 'react'
import Container from '../components/Container'
import ESpinner from '../components/ESpinner';

const TermsAndCondition = () => {

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
                                    <h3 className='text-center'>Terms & Conditions</h3>
                                    <p className='text-center'>Terms and Conditions for Guaranteed Delivery</p>
                                    <p>
                                        • Guaranteed delivery options are available on Prime Eligible items in select cities. <br />
                                        • Orders must be placed within the time frame mentioned on the product details page to avail the option. The “order within” countdown timer provides the window of time in which you must place the order to receive your delivery by the date shown. That delivery date may become unavailable within that window of time due to changes in inventory or delivery capacity before you place your order. Your confirmed delivery date will be included in your order confirmation email. <br />
                                        • Only certain pin codes are eligible for these options. <br />
                                        • To get your order within the guaranteed delivery time, you need to select the respective delivery option during checkout. <br />
                                        • Items belonging to large appliances and furniture categories do not qualify for these express shipping options. <br />
                                        • The Delivery guarantee applies to attempted delivery by the promised date. Amazon will not be responsible to provide guaranteed delivery if the customer is not present at the delivery address to take the delivery or if the customer picks up the package on a later date though the package has been delivered at the pickup store on the promised date. <br />
                                        • On Saturdays, and regional or national holidays, deliveries are not guaranteed to establishments like offices that might be closed. <br />
                                        • Store operating hours and working days are displayed while selecting the pick-up store at the time of order placement. <br />
                                        • We are constantly working to expand our coverage. Please check availability of guaranteed delivery options for your pincode on the detail page or at check out. <br />
                                        • Your package will be delivered to the pickup store on your estimated delivery date and you will get a notification mail once the package is delivered to the store and is ready for pickup.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
            }
        </>
    )
}

export default TermsAndCondition