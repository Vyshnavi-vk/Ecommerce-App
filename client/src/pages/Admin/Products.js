import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'
import Layouts from '../../components/Layouts/Layouts'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Layouts>
            <div>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Products list</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map(p => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className='product-link'
                                >
                                    <div class="card m-2" style={{ width: "18rem" }} key={p._id}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top "
                                            alt={p.name}
                                            style={{ height: "150px" }}
                                        />
                                        <div class="card-body">
                                            <h5 class="card-title">{p.name}</h5>
                                            <p class="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default Products
