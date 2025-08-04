import React, { useEffect, useState } from 'react';
import "../AdminStyles/UpdateProduct.css";
import PageTitle from '../components/PageTitle';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { getProductDetails } from "../features/product/productSlice"
import { useDispatch, useSelector } from 'react-redux';
import { removeError, removeSuccess, updateProduct } from '../features/admin/adminSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { product } = useSelector(state => state.product)
    const { success, error, loading } = useSelector(state => state.admin)
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()

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
    // console.log(product)

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

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", Number(price));
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", Number(stock));

        image.forEach((img) => {
            myForm.append("images", img);
        });

        dispatch(updateProduct({ id, formData: myForm }))


    };

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
        }
    }, [dispatch, id])


    useEffect(() => {
        if (product && product._id === id) {
            setName(product.name || "");
            setPrice(product.price || "");
            setDescription(product.description || "");
            setCategory(product.category || "");
            setStock(product.stock || "");
            setOldImage(product.image);
        }
    }, [product])




    useEffect(() => {
        if (error) {
            toast.error("Failed to update product", { position: "top-center", autoClose: 3000 });
            dispatch(removeError());

        }
        if (success) {
            toast.success("Product Updated Successfully", { position: "top-center", autoClose: 3000 })
            dispatch(removeSuccess())
            navigate("/admin/products")
        }
    }, [dispatch, success, error])



    if (loading && !product) {
        return <Loader />;
    }

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
                            key={image.length}
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
                            <img key={index} src={img.url} alt={`Old Preview ${index}`} className="update-product-old-image" />
                        ))}
                    </div>


                    <button type="submit" className="update-product-submit-btn">
                        {loading ? "Updating Product..." : "Update"}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProduct;
