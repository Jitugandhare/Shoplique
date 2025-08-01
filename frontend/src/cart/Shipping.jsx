import React, { useState, useEffect } from 'react'
import "../cartStyles/Shipping.css"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import CheckOutPath from './CheckOutPath'
import { Country, State, City } from 'country-state-city'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
    const { shippingInfo } = useSelector(state => state.cart);
    const [address, setAddress] = useState(shippingInfo.address || "")
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "")
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "")
    const [country, setCountry] = useState(shippingInfo.country || "")
    const [state, setState] = useState(shippingInfo.state || "")
    const [city, setCity] = useState(shippingInfo.city || "")

    const dispatch = useDispatch();
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        e.preventDefault()
        if (phoneNumber.length !== 10) {
            toast.error("Phone number must be exactly 10 digits. ", { position: "top-center", autoClose: 3000 })
            return
        }
        dispatch(saveShippingInfo({ address, pinCode, phoneNumber, country, state, city }));

        navigate("/order/confirm");


        console.log({ address, pinCode, phoneNumber, country, state, city })
    }

    return (
        <>
            <PageTitle title="Shipping Info" />
            <NavBar />
            <CheckOutPath activePath={0} />

            <div className="shipping-form-container">
                <h1 className="shipping-form-header">Shipping Details</h1>

                <form className="shipping-form" onSubmit={handleSubmit}>

                    <div className="shipping-section">

                        <div className="shipping-form-group">
                            <label htmlFor='address'>Address:</label>
                            <input type="text" id='address' value={address} placeholder='Enter your address' onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor='pinCode'>Pin Code:</label>
                            <input type="number" id='pinCode' value={pinCode} placeholder='Enter your Pin Code' onChange={(e) => setPinCode(e.target.value)} required />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                            <input type="number" id='phoneNumber' value={phoneNumber} placeholder='Enter your Phone Number'
                                pattern="[0-9]{10}"
                                maxLength="10"
                                onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                    </div>

                    <div className="shipping-section">

                        <div className="shipping-form-group">
                            <label htmlFor="country">Country:</label>
                            <select id="country" onChange={(e) => {
                                setCountry(e.target.value)
                                setState("")
                                setCity("")


                            }}
                                value={country}
                                required>
                                <option value="">Select a country</option>
                                {Country.getAllCountries().map((c) => (
                                    <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {
                            country && (<div className="shipping-form-group">
                                <label htmlFor="state">State:</label>
                                <select id="state" onChange={(e) => {
                                    setState(e.target.value)
                                    setCity("")
                                }} value={state} required>
                                    <option value="">Select a state</option>
                                    {State.getStatesOfCountry(country).map((s) => (
                                        <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            )
                        }

                        {
                            state && (
                                <div className="shipping-form-group">
                                    <label htmlFor="city">City:</label>
                                    <select id="city" onChange={(e) => setCity(e.target.value)} value={city} required>
                                        <option value="">Select a city</option>
                                        {City.getCitiesOfState(country, state).map((c) => (
                                            <option key={c.name} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        }

                    </div>

                    <button type="submit" className="shipping-submit-btn" disabled={
                        !address || !pinCode || !phoneNumber || !country || !state || !city
                    }>Continue</button>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default Shipping
