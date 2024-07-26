import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import { useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from "../../../public/logo.png";

const Navbar = () => {
  const userString = localStorage.getItem('users');
  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Failed to parse user data:", error.message);
    }
  }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('users');
    navigate('/login');
  };

  const cartItem = useSelector((state) => state.cart);

  return (
    <nav className='bg-[#222831] sticky top-0 text-[#EEEEEE] z-50 py-8'>
      <div className='flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-center lg:px-8'>
        <div className='px-4 lg:px-0 lg:flex lg:items-center lg:justify-center flex flex-row justify-center items-center'>
          <Link to='/'>
            <img className='w-40' src={logo} alt='Logo'/>
          </Link>
          
        <div className='w-full  lg:hidden'>
          <SearchBar />
        </div>
        </div>
        <div className='hidden lg:flex lg:items-center'>
          <ul className='flex space-x-5 font-medium text-md px-5 items-center'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/allproduct'>All Product</Link></li>
            <li><Link to='/cart'>Cart {cartItem.length > 0 ? <sup className='text-red-600 font-bold text-sm'>{cartItem.length}</sup> : null}</Link></li>
            {!user && <li><Link to='/signup'>Signup</Link></li>}
            {!user && <li><Link to='/login'>Login</Link></li>}
            {user?.role === 'user' && <li><Link to='/user-dashboard'>Hi, {user.firstname}</Link></li>}
            {user?.role === 'admin' && <li><Link to='/admin-dashboard'>Hi, {user.firstname}</Link></li>}
            {user && <li className='cursor-pointer flex items-center gap-2' onClick={logout}>Sign out <FaSignOutAlt /></li>}
          </ul>
        </div>
        <div className='hidden lg:flex lg:items-center'>
          <SearchBar />
        </div>
      </div>
      <div id="menu" className='lg:hidden flex flex-col items-center bg-[#222831] text-[#EEEEEE]'>
        
        <ul className='flex flex-col space-y-5 font-medium text-md px-5 items-center'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/allproduct'>All Product</Link></li>
          <li><Link to='/cart'>Cart {cartItem.length > 0 ? <sup className='text-red-600 font-bold text-sm'>{cartItem.length}</sup> : null}</Link></li>
          {!user && <li><Link to='/signup'>Signup</Link></li>}
          {!user && <li><Link to='/login'>Login</Link></li>}
          {user?.role === 'user' && <li><Link to='/user-dashboard'>Hi, {user.firstname}</Link></li>}
          {user?.role === 'admin' && <li><Link to='/admin-dashboard'>Hi, {user.firstname}</Link></li>}
          {user && <li className='cursor-pointer flex items-center gap-2' onClick={logout}>Sign out <FaSignOutAlt /></li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


