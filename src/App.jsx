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
import UpdateProductPage from './pages/admin/UpdateProductPage.jsx'
import MyState from "./context/myState";
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import AddProductPage from './pages/admin/AddProductPage.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';

function App() {
  return (
    <MyState>
     <Router>
     <ScrollTop />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/*' element={<EmptyPages/>}/>
          <Route path='/productinfo/:id' element={<ProductInfo/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path={`/updateproduct/:id`} element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster/>
     </Router>
    </MyState>
  )
}

export default App



