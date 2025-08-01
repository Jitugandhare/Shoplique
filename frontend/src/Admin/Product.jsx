import React, { useEffect, useState } from 'react'
import "../AdminStyles/CreateProduct.css"
import PageTitle from "../components/PageTitle"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, removeError, removeSuccess } from "../features/admin/adminSlice"
import { toast } from 'react-toastify'




const Product = () => {
    const { loading, success, error, admin } = useSelector(state => state.admin);
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [image, setImage] = useState([])
    const [imagePreview, setImagePreview] = useState([])
    const [category, setCategory] = useState("")

    const categories = [
        "Mobile", "Laptops", "Clothing", "Shirt",
        "Books", "Toys", "T-shirt", "Pants", "Jackets", "Footwear", "Jewellery","Bags"
    ]

    const handleCreateProduct = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name)
        myForm.set("price", price)
        myForm.set("description", description)
        myForm.set("stock", stock)
        myForm.set("category", category)

        image.forEach((img) => {
            myForm.append("image", img);
        });

        dispatch(createProduct(myForm))

    }

    const createImageProduct = (e) => {
        const files = Array.from(e.target.files);

        setImage([]);
        setImagePreview([]);



        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {


                if (reader.readyState === 2) {
                    setImage((old) => [...old, reader.result]);
                    setImagePreview((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };


    useEffect(() => {
        if (success) {
            toast.success("Product Creates Successfully.", { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());
            setName("")
            setPrice("")
            setCategory("")

            setImage([])
            setImagePreview([])
            setStock("")

        }
    }, [dispatch, success])


    useEffect(() => {
        if (error) {
            toast.error("Failed to create product", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());

        }
    }, [dispatch, error])

    return (
        <>
            <PageTitle title="Create Product" />
            <NavBar />

            <div className="create-product-container">
                <h1 className="form-title">Create Product</h1>

                <form
                    className="product-form"
                    encType="multipart/form-data"
                    onSubmit={handleCreateProduct}
                >
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter Product Name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="number"
                        className="form-input"
                        placeholder="Enter Product Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter Product Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        name="category"
                        className="form-select"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Select a Category</option>
                        {categories.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        className="form-input"
                        placeholder="Enter Product Stock"
                        name="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <div className="file-input-container">
                        <input
                            type="file"
                            className="form-input-file"
                            accept="image/*"
                            name="image"
                            multiple
                            onChange={createImageProduct}
                        />
                    </div>

                    <div className="image-preview-container">
                        {imagePreview.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`preview-${idx}`}
                                className="image-preview"
                            />
                        ))}
                    </div>

                    <button className="submit-btn" type="submit">
                        {loading ? "Creating Product..." : "Create"}
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default Product;
