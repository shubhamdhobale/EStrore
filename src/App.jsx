import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import EmptyPages from './pages/EmptyPage/EmptyPages';
import ProductInfo from './pages/productInfo/ProductInfo.jsx';
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from './pages/cart/CartPage.jsx';
import AllProduct from "./pages/allProducts/AllProducts.jsx";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProductDetail from './pages/admin/AddProductPage.jsx'
import UpdateProductPage from './pages/admin/UpdateProductPage.jsx'

function App() {
  return (
    <div>
     <Router>
     <ScrollTop />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/*' element={<EmptyPages/>}/>
          <Route path='/productinfo' element={<ProductInfo/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/addproduct" element={<ProductDetail />} />
          <Route path="/updateproduct" element={<UpdateProductPage />} />
        </Routes>
     </Router>
    </div>
  )
}

export default App



