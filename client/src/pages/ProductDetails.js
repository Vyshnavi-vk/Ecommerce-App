import React, { useState, useEffect } from 'react'
import Layouts from '../components/Layouts/Layouts'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../styles/ProductDetails.css'


const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState([])
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layouts>

            <div className='row container mt-2 product-details'>
                <div className='col-md-6'>
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className='card-img-top'
                        height="300"
                        width="350px"
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-center">Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className='row m-2 container similar-products'>
                <h1>Similar Products</h1>
                {relatedProducts.length < 1 && <p className='text-center'>No similar products found</p>}
                <div className='d-flex flex-wrap' >
                    {relatedProducts?.map(p => (

                        <div class="card m-2" style={{ width: "18rem" }} key={p._id}>
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top "
                                alt={p.name}
                                style={{ height: "150px" }}
                            />
                            <div class="card-body">
                                <h5 class="card-title">{p.name}</h5>
                                <p class="card-text">{p.description.substring(0, 30)}</p>
                                <p class="card-text">$ {p.price}</p>
                                <button className='btn btn-secondary ms-1'>ADD To Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layouts>
    )
}

export default ProductDetails
