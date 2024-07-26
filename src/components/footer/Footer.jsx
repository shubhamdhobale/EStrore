import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => { 
    return (
        <div>   
            {/* footer  */}
            <footer className="w-full relative">
                {/* <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#00ADB5" fillOpacity="1" d="M0,64L30,96C60,128,120,192,180,181.3C240,171,300,85,360,42.7C420,0,480,0,540,42.7C600,85,660,171,720,176C780,181,840,107,900,74.7C960,43,1020,53,1080,85.3C1140,117,1200,171,1260,192C1320,213,1380,203,1410,197.3L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                    </svg>
                </div> */}

                <div className="w-full bg-[#00ADB5] flex flex-row gap-8 px-4 justify-evenly py-10 text-[#222831]">
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold tracking-wider'>Customer Care</h1>
                        <div className='flex flex-col mt-3 gap-2'>
                            <div className='flex flex-row  gap-4'>
                                 <FaMapMarkerAlt/>
                                <p>Lorem ipsum dolor <br/>amet. 415555</p>
                            </div>
                            <div className='flex flex-row  gap-4'>
                                <FaEnvelope/>
                                <p>abc@gmail.com</p>
                            </div>
                            <div className='flex flex-row  gap-4'>
                                <FaPhone/>
                                <p>+91 1234567890</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold tracking-wider'>Useful Links</h1>
                            <Link to="/" className="cursor-pointer hover:text-[#EEEEEE] duration-500 tracking-wider hover:underline">Home</Link>
                            <Link to="/allproduct" className="cursor-pointer hover:text-[#EEEEEE] duration-500 tracking-wider hover:underline">All Products</Link>
                            <Link to="/cart" className="cursor-pointer hover:text-[#EEEEEE] duration-500 tracking-wider hover:underline">Cart</Link>
                            <Link to="/user-dashboard" className="cursor-pointer hover:text-[#EEEEEE] duration-500 tracking-wider hover:underline">Profile</Link>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold tracking-wider'>Social Media</h1>
                        <div className='flex flex-col gap-4'>
                            <FaFacebook size={20}  className="cursor-pointer hover:text-[#EEEEEE] duration-500"/>
                            <FaInstagram size={20} className="cursor-pointer hover:text-[#EEEEEE] duration-500"/>
                            <FaTwitter size={20} className="cursor-pointer hover:text-[#EEEEEE] duration-500"/>
                            <FaWhatsapp size={20} className="cursor-pointer hover:text-[#EEEEEE] duration-500"/>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-[#222831] text-white text-center py-4">
                    <p className="text-md tracking-wider">@ 2024 | <Link to="/" className="hover:underline hover:text-[#00ADB5] duration-500">Estore</Link>  | All Copyrights Reserved</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
