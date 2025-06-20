import React from 'react'
import NavBar from '../components/NavBar'
import "../pageStyles/Home.css"

import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'

const products = [
    {
        "_id": "683072335f2d5f9c2e6f728c",
        "name": "Product-2",
        "description": "Product-2 description",
        "price": 100,
        "category": "underwear",
        "brand": "kalu",
        "stock": 2,
        "image": [
            {
                "public_id": "Product id image id",
                "url": "url of image",
                "_id": "683310edaac373ffcc919a98"
            }
        ],
        "ratings": 4.5,
        "numOfReviews": 2,
        "isFeatured": false,
        "reviews": [
            {
                "user": "6849518a999803dc6c7492d0",
                "name": "ravi",
                "rating": 4,
                "comment": "good",
                "createdAt": "2025-06-14T03:23:37.029Z",
                "_id": "684ceb39387e1811742680bf"
            },
            {
                "user": "6846c9a24d238d2042ff2e16",
                "name": "jitu",
                "rating": 5,
                "comment": "good",
                "_id": "684ced8e0a963077f6370002",
                "createdAt": "2025-06-14T03:33:34.511Z"
            }
        ],
        "createdAt": "2025-05-23T13:03:47.189Z",
        "__v": 6
    },
    {
        "_id": "68330d32f2fab79ee23293c8",
        "name": "Product-3",
        "description": "Product-3 description",
        "price": 200,
        "category": "pant",
        "brand": "Roadster",
        "stock": 1,
        "image": [
            {
                "public_id": "Product id image id",
                "url": "url of image",
                "_id": "68330d32f2fab79ee23293c9"
            }
        ],
        "ratings": 0,
        "numOfReviews": 0,
        "isFeatured": false,
        "reviews": [],
        "createdAt": "2025-05-25T12:29:38.273Z",
        "__v": 0
    },
    {
        "_id": "68330e1f693a189c443879e3",
        "name": "Product-4",
        "description": "Product-4 description",
        "price": 200,
        "category": "jeans",
        "brand": "Roadster",
        "stock": 1,
        "image": [
            {
                "public_id": "Product id image id",
                "url": "url of image",
                "_id": "68330e1f693a189c443879e4"
            }
        ],
        "ratings": 0,
        "numOfReviews": 0,
        "isFeatured": false,
        "reviews": [],
        "createdAt": "2025-05-25T12:33:35.996Z",
        "__v": 0
    }
]


const Home = () => {
    return (

        <>
            <NavBar />
            <PageTitle title="my-website" />
            <ImageSlider />
            <div className="home-container">
                <h2 className="home-heading">Trending Now</h2>
                <div className="home-product-container">
                    {
                        products.map((product) => (
                            <Product key={product._id}
                                product={product}
                            />
                        ))
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </>

    )
}

export default Home