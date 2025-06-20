import React from 'react'
import NavBar from '../components/NavBar'


import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'

const Home = () => {
  return (

    <>
      <NavBar />
      <ImageSlider />
      <div className="home-container">
        <h2 className="home-heading">Trending Now</h2>
      </div>
      {/* <Footer /> */}
    </>

  )
}

export default Home