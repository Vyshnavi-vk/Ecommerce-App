import React, { useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/AuthStyles.css';


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',
                { name, email, password, phone, address, answer });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layouts title={'Register now'}>
            <div className='form-container'>
                <h1>Register</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter your Name'
                            className="form-control"
                            id="exampleInputName"
                            required
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
                            required
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
                            required
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
                            required
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
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='What is your pet name'
                            className="form-control"
                            id="exampleInputAddress"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        </Layouts>
    )
}

export default Register
