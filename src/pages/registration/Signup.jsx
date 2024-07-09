/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , fireDB } from "../../firebase/FirebaseConfig";
import { addDoc , Timestamp , collection } from "firebase/firestore";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";


const Signup = () => {
    

    const context = useContext(myContext);
    const {loading , setLoading } = context;

    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        firstname:"",
        lastname:"",
        email: "",
        password: "",
        role:"user"
    })

    const handleSubmit =  async () => {
        if(formData.firstname == "" || formData.lastname == "" || formData.email == "" || formData.password == ""){
            return toast.error("All Fields are required");
        }
        setLoading(true);

        try {
            const users = await createUserWithEmailAndPassword(auth , formData.email , formData.password);

            const user = {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                role: formData.role,
                uid: users.user.uid,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day : "2-digit",
                        year :"numeric"
                    }
                )
            }

            const userRefrence = collection(fireDB , "user")

            addDoc(userRefrence , user);

            setFormData({
                firstname:"",
                lastname:"",
                email: "",
                password: "",
            })
            toast.success("Signup Successfully");
            setLoading(false);
            navigate('/login');

        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            })
    }

    return (
        <Layout>
        <div className='flex justify-center items-center h-screen'>

            {loading && <Loader/>}
            {/* Login Form  */}
            <div className="login_Form  px-1 lg:px-8 py-6 border border-[#00ADB5] rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-[#00ADB5] '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='First Name'
                        value={formData.firstname}
                        onChange={handleChange}
                        name="firstname"
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='last Name'
                        value={formData.lastname}
                        onChange={handleChange}
                        name="lastname"
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                    onClick={handleSubmit}
                        type='button'
                        className='bg-[#00ADB5] hover:bg-[#00ADB5] w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-[#00ADB5] font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
        
            
        </Layout>
    );
}

export default Signup;