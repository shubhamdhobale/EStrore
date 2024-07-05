/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Login = () => {

    const navigate = useNavigate();

    const context = useContext(myContext);
    const {loading , setLoading } = context;

    const [formData , setFormData] = useState({
        email : '' ,
        password : ''
    })

    const handleSubmit = async() => {
        if(formData.email == "" || formData.password == ""){
            toast.error("All Fields are required");
        }
        setLoading(true);

        try {
            const users = await signInWithEmailAndPassword(auth , formData.email , formData.password)

           try {
            const q = query(collection(fireDB , "user"), where('uid','==',users?.user?.uid));
            const data = onSnapshot(q , (QuerySnapshot) => {
             let user;
             QuerySnapshot.forEach((doc) => user = doc.data());
             localStorage.setItem("users" , JSON.stringify(user))
             setFormData({
                 email :"",
                 password : ""
             })
             toast.success("Login Successfully");
             setLoading(false)
             if(user.role == "user"){
                 navigate("/user-dashboard")
             }
             else{
                 navigate("/admin-dashboard")
             }
            });
            return () => data;
           } catch (error) {
            console.log(error)
            setLoading(false)
           }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed")
        }
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
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
                        Login
                    </h2>
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
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-[#00ADB5] font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
        </Layout>
    );
}

export default Login;