import React from 'react'
import Layouts from '../components/Layouts/Layouts'
import { useSearch } from '../context/Search'


const Search = () => {
    const [values, setvalues] = useSearch()
    return (
        <Layouts title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className='d-flex flex-wrap mt-4' >
                        {values?.results.map(p => (

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
                                    <button className='btn btn-primary ms-1'>More Details</button>
                                    <button className='btn btn-secondary ms-1'>ADD To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default Search
