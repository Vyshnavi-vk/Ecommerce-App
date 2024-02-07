import React, { useState, useEffect } from 'react'
import Layouts from '../components/Layouts/Layouts'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
    return (
        <Layouts title={"All Categories"}>
            <div className='container' style={{ marginTop: "100px" }}>
                <div className='row'>
                    {categories.map((c) => (
                        <div className='col-md-4 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                            <Link
                                className='btn btn-outline-secondary'
                                to={`/category/${c.slug}`}
                                style={{
                                    height: "100px",
                                    width: '300px',
                                    padding: '30px',
                                    fontSize: '25px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {c.name.toUpperCase()}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layouts>
    )
}

export default Categories
