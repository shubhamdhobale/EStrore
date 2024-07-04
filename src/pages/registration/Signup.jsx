/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const Signup = () => {
    return (
        <Layout>
        <div className='flex justify-center items-center h-screen'>
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
                        placeholder='Full Name'
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
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