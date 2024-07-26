import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import { useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from "../../../public/logo.png"

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
    <nav className='bg-[#222831] sticky top-0 text-[#EEEEEE] z-50'>
      <div className='lg:flex lg:justify-between lg:items-center py-4 lg:px-8'>
        <div className='left py-3 lg:py-0'>
          <Link to='/'>
            <img className='w-40' src={logo}/>
          </Link>
        </div>
        <div className='right flex justify-center mb-4 lg:mb-0'>
          <ul className='flex space-x-5 font-medium text-md px-5 items-center'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/allproduct'>All Product</Link></li>
            <li><Link to='/cart'>Cart {cartItem.length > 0 ? <sup className='text-red-600 font-bold text-sm'>{cartItem.length}</sup>: <></>}</Link></li>
            {!user && <li><Link to='/signup'>Signup</Link></li>}
            {!user && <li><Link to='/login'>Login</Link></li>}
            {user?.role === 'user' && <li><Link to='/user-dashboard'>Hi, {user.firstname}</Link></li>}
            {user?.role === 'admin' && <li><Link to='/admin-dashboard'>Hi, {user.firstname}</Link></li>}
            {user && <li className='cursor-pointer flex items-center gap-2' onClick={logout}>Sign out <FaSignOutAlt /></li>}
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
