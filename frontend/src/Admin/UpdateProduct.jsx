import React, { useState } from 'react';
import "../AdminStyles/UpdateProduct.css";
import PageTitle from '../components/PageTitle';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const UpdateProduct = () => {
    const { loading, error, success, admin } = useSelector(state => state.admin)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [image, setImage] = useState([])
    const [oldImage, setOldImage] = useState([])
    const [imagePreview, setImagePreview] = useState([])
    const [category, setCategory] = useState("")
    const categories = [
        "Mobile", "Laptops", "Clothing", "Shirt",
        "Books", "Toys", "T-shirt", "Pants", "Jackets", "Footwear", "Jewellery", "Bags"
    ]


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImage([]);
        setImagePreview([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(old => [...old, reader.result]);
                    setImage(old => [...old, file]);
                }
            }

            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price || !description || !category || !stock) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("stock", stock);

        image.forEach((img) => {
            formData.append("images", img);
        });


    };

    return (
        <>
            <PageTitle title="Update Product" />
            <NavBar />
            <div className="update-product-wrapper">
                <h1 className="update-product-heading">Update Product</h1>

                <form onSubmit={handleSubmit} encType='multipart/form-data' className="update-product-form">
                    <label htmlFor="name" className="update-product-label">Product Name</label>
                    <input
                        type="text"
                        className='update-product-input'
                        id="name"
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />

                    <label htmlFor="price" className="update-product-label">Product Price</label>
                    <input
                        type="number"
                        className='update-product-input'
                        id="price"
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}

                    />

                    <label htmlFor="description" className="update-product-label">Product Description</label>
                    <textarea
                        className='update-product-textarea'
                        id="description"
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />

                    <label htmlFor="category" className="update-product-label">Product Category</label>
                    <select
                        name="category"
                        id="category"
                        className='update-product-select'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                    >
                        <option value="" disabled>Select category</option>
                        {categories.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="stock" className="update-product-label">Product Stock</label>
                    <input
                        type="number"
                        className='update-product-input'
                        id="stock"
                        name='stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}

                    />

                    <label htmlFor="image" className="update-product-label">Product Images</label>
                    <div className="update-product-file-wrapper">
                        <input
                            type="file"
                            className="update-product-file-input"
                            accept='image/*'
                            name='image'
                            id='image'
                            multiple
                            onChange={handleImageChange}

                        />
                    </div>


                    <div className="update-product-preview-wrapper">
                        {imagePreview.map((img, index) => (
                            <img key={index} src={img} alt={`Preview ${index}`} className="update-product-preview-image" />
                        ))}
                    </div>

                    <div className="update-product-old-images-wrapper">
                        {oldImage.map((img, index) => (
                            <img key={index} src={img} alt={`Old Preview ${index}`} className="update-product-old-image" />
                        ))}
                    </div>


                    <button type="submit" className="update-product-submit-btn">
                        {loading ? <Loader size="small" /> : "Update Product"}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProduct;
