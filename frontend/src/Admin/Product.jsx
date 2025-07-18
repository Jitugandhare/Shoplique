import React, { useState } from 'react'
import "../AdminStyles/CreateProduct.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"


const Product = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [image, setImage] = useState([])
    const [category, setCategory] = useState("")
    const categories = ["Mobile", "Laptops", "Clothing", "Shirt", "Books", "Toys",
        "T-shirt", "Pants", "Jackets"]


    const handleCreateProduct = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name)
        myForm.set("price", price)
        myForm.set("description", description)
        myForm.set("stock", stock)
        myForm.set("category", category)
        myForm.set("name", name)
        image.forEach((img) => {
            myForm.append("image", img)
        })
        console.log(myForm.entries())
    }


    return (
        <>

            <PageTitle title="Create Product" />
            <NavBar />
            <div className="create-product-container">

                <h1 className="form-title">Create Product</h1>

                <form className="product-form" encType='multipart/form-data'
                    onSubmit={handleCreateProduct}
                >
                    <input type="text" className='form-input' placeholder='Enter Product Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" className='form-input' placeholder='Enter Product Price' name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" className='form-input' placeholder='Enter Product Description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <select name="category" className="form-select" required value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled>Select a Category</option>
                        {
                            categories.map((item) => (
                                <option value={item} key={item} >{item}</option>
                            ))
                        }
                    </select>
                    <input type="number" className='form-input' placeholder='Enter Product Stock' name='stock' value={stock} onChange={(e) => setStock(e.target.value)} />


                    <div className="file-input-container">
                        <input type="file"
                            className='form-input-file'
                            accept='image/'
                            name='image'
                            multiple
                            value={image}
                            onChange={(e) => setImage(e.target.value)}

                        />
                    </div>

                    <div className="image-preview-container">
                        <img src="" alt="Product-Preview" className="image-preview" />
                    </div>

                    <button className="submit-btn" type='submit'>Create</button>
                </form>
            </div>


            <Footer />

        </>
    )
}

export default Product