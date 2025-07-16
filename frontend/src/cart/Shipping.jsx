import React from 'react'
import "../cartStyles/Shipping.css"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import CheckOutPath from './CheckOutPath'


const Shipping = () => {
    
    return (
        <>
            <PageTitle title="Shipping Info" />
            <NavBar />
            <CheckOutPath activePath={0}/>

            <div className="shipping-form-container">
                <h1 className="shipping-form-header">Shipping Details</h1>
                <form className="shipping-form">
                    <div className="shipping-section">
                        <div className="shipping-form-group">
                            <label htmlFor='address'>Address:</label>
                            <input type="text" name="address" placeholder='Enter your address' id='address' />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor='pinCode'>Pin Code:</label>
                            <input type="number" name="pinCode" placeholder='Enter your Pin Code' id='pinCode' />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor='tel'>Phone Number:</label>
                            <input type="number" name="phoneNumber" placeholder='Enter your Phone Number' id='phoneNumber' />
                        </div>


                    </div>



                    <div className="shipping-section">

                        <div className="shipping-form-group">

                            <label htmlFor="country">Country:</label>
                            <select name="country" id="country">
                                <option value="" > Select a country</option>
                            </select>
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="state">State:</label>
                            <select name="state" id="state">
                                <option value="" > Select a state</option>
                            </select>
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="city">City:</label>
                            <select name="city" id="city">
                                <option value="" > Select a city</option>
                            </select>
                        </div>

                    </div>


                    <button className="shipping-submit-btn">Continue</button>
                </form>


            </div>
            <Footer />
        </>
    )
}

export default Shipping