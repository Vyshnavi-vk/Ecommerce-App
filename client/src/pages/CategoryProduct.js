import React, { useState, useEffect } from 'react'
import Layouts from '../components/Layouts/Layouts'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "../styles/CatProductStyles.css";


const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) getProductsByCat()
    }, [params?.slug])
    return (
        <Layouts>
            <div className='container category'>
                <h4 className='text-center mt-3'>Category - {category?.name}</h4>
                <h6 className='text-center mt-3'>{products?.length} result found</h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "18rem" }}
                                    key={p._id}
                                >
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        height="200"
                                        width="250px"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> $ {p.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button className="btn btn-secondary ms-1">
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default CategoryProduct
