import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import UserMenu from '../../components/Layouts/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'


const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile',
                { name, email, password, phone, address });

            if (data?.error) {
                toast.error(data.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('Profile updated successfully')
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        const { email, name, phone, address, password } = auth?.user;
        setName(name)
        setPhone(phone)
        setEmail(email)
        setAddress(address)
    }, [auth?.user])


    return (
        <Layouts title={"Your Profile"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='form-container'>
                            <form onSubmit={submitHandler}>
                                <h1>User Profile</h1>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Enter your Name'
                                        className="form-control"
                                        id="exampleInputName"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter your Email'
                                        className="form-control"
                                        id="exampleInputEmail"
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Enter your Password'
                                        className="form-control"
                                        id="exampleInputPassword1"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder='Enter your Phone'
                                        className="form-control"
                                        id="exampleInputPhone"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder='Enter your Address'
                                        className="form-control"
                                        id="exampleInputAddress"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default Profile
