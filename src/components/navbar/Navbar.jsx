import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';

const Navbar = () => {
  return (
    <nav className='bg-[#222831] sticky top-0 text-[#EEEEEE] z-50'>
      <div className='lg:flex lg:justify-between lg:items-center py-4 lg:px-8'>
        <div className='left py-3 lg:py-0'>
          <Link to='/'>
          <h1 className='font-body  text-2xl text-center'>EStore</h1>
          </Link>
        </div>
        <div className='right flex justify-center mb-4 lg:mb-0'>
          <ul className='flex space-x-5 font-medium text-md px-5'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/allproduct'>All Product</Link></li>
              <li><Link to='/cart'>Cart(0)</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
              <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
        <SearchBar/>
      </div>
    </nav>
  )
}

export default Navbar