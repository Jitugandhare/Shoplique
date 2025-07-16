import React, { useState, useEffect } from 'react'
import "../cartStyles/Shipping.css"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import CheckOutPath from './CheckOutPath'
import { Country, State, City } from 'country-state-city'

const Shipping = () => {
    const [address, setAddress] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")

    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])


    useEffect(() => {
        setCountryList(Country.getAllCountries())
    }, [])

    useEffect(() => {
        if (country) {
            const states = State.getStatesOfCountry(country)
            setStateList(states)
            setState("")
            setCity("")
            setCityList([])
        }
    }, [country])

    useEffect(() => {
        if (state) {
            const cities = City.getCitiesOfState(country, state)
            setCityList(cities)
            setCity("")
        }
    }, [state])

    const handleSubmit = (e) => {
        e.preventDefault()

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
                            <input type="text" id='address' placeholder='Enter your address' onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor='pinCode'>Pin Code:</label>
                            <input type="number" id='pinCode' placeholder='Enter your Pin Code' onChange={(e) => setPinCode(e.target.value)} required />
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor='phoneNumber'>Phone Number:</label>
                            <input type="number" id='phoneNumber' placeholder='Enter your Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                    </div>

                    <div className="shipping-section">
                        
                        <div className="shipping-form-group">
                            <label htmlFor="country">Country:</label>
                            <select id="country" onChange={(e) => setCountry(e.target.value)} required>
                                <option value="">Select a country</option>
                                {countryList.map((c) => (
                                    <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="state">State:</label>
                            <select id="state" onChange={(e) => setState(e.target.value)} value={state} required>
                                <option value="">Select a state</option>
                                {stateList.map((s) => (
                                    <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="shipping-form-group">
                            <label htmlFor="city">City:</label>
                            <select id="city" onChange={(e) => setCity(e.target.value)} value={city} required>
                                <option value="">Select a city</option>
                                {cityList.map((c) => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="shipping-submit-btn">Continue</button>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default Shipping
