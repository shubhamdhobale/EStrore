import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import Layout from '../../components/layout/Layout';

const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'Home'
    },
    {
        name: 'books'
    }
]

// const products = [
//     {
//       id: 1,
//       image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
//       title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//       desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//       price: 120,
//       trendingProductName: 'Featured',
//       quantity: 1,
//       category: 'Home'
//     },
//     {
//       id: 2,
//       image: 'https://i.pinimg.com/564x/0a/0c/1b/0a0c1b4d46fcb30a7b47ec06d47a8c35.jpg',
//       title: 'Designer Fashion Dress',
//       desc: 'Elegant designer fashion dress for all occasions. Made with high-quality materials.',
//       price: 250,
//       trendingProductName: 'New Arrival',
//       quantity: 1,
//       category: 'fashion'
//     },
//     {
//       id: 3,
//       image: 'https://i.pinimg.com/564x/3b/48/4a/3b484a52bcb1c57e2b61c834d9ad2d52.jpg',
//       title: 'Casual Cotton Shirt',
//       desc: 'Comfortable and stylish casual cotton shirt, perfect for everyday wear.',
//       price: 45,
//       trendingProductName: 'Best Seller',
//       quantity: 1,
//       category: 'shirt'
//     },
//     {
//       id: 4,
//       image: 'https://i.pinimg.com/564x/8b/67/33/8b6733a8d34a4f4b9a2b9d8f3a25e5e5.jpg',
//       title: 'Leather Jacket',
//       desc: 'High-quality leather jacket for a bold and stylish look.',
//       price: 320,
//       trendingProductName: 'Trending',
//       quantity: 1,
//       category: 'jacket'
//     },
//     {
//       id: 5,
//       image: 'https://i.pinimg.com/564x/5a/53/15/5a53154a987b4d1bba2e7f6e59c3e46c.jpg',
//       title: 'Latest Smartphone',
//       desc: 'Feature-packed latest smartphone with a stunning display and powerful performance.',
//       price: 999,
//       trendingProductName: 'Hot Deal',
//       quantity: 1,
//       category: 'mobile'
//     },
//     {
//       id: 6,
//       image: 'https://i.pinimg.com/564x/6f/70/42/6f7042809d4dba2586ed5a99e77c454a.jpg',
//       title: 'High-Performance Laptop',
//       desc: 'Powerful laptop for all your computing needs, from work to play.',
//       price: 1500,
//       trendingProductName: 'Editor\'s Pick',
//       quantity: 1,
//       category: 'laptop'
//     },
//     {
//       id: 7,
//       image: 'https://i.pinimg.com/564x/72/2d/0f/722d0f4ff87e4a3bb15443d44730ed3d.jpg',
//       title: 'Running Shoes',
//       desc: 'Comfortable and durable running shoes for all your fitness activities.',
//       price: 80,
//       trendingProductName: 'Must Have',
//       quantity: 1,
//       category: 'shoes'
//     },
//     {
//       id: 8,
//       image: 'https://i.pinimg.com/564x/a1/8a/f5/a18af5ec0a8d40e0be0c48bce19635a8.jpg',
//       title: 'Inspirational Book',
//       desc: 'A must-read inspirational book that will change your perspective on life.',
//       price: 25,
//       trendingProductName: 'Top Read',
//       quantity: 1,
//       category: 'books'
//     },
//       {
//         id: 2,
//         image: 'https://i.pinimg.com/564x/0a/0c/1b/0a0c1b4d46fcb30a7b47ec06d47a8c35.jpg',
//         title: 'Elegant Evening Gown',
//         desc: 'Elegant evening gown for formal occasions. Made with premium materials.',
//         price: 300,
//         trendingProductName: 'New Arrival',
//         quantity: 1,
//         category: 'fashion'
//       },
//       {
//         id: 3,
//         image: 'https://i.pinimg.com/564x/3b/48/4a/3b484a52bcb1c57e2b61c834d9ad2d52.jpg',
//         title: 'Classic White Cotton Shirt',
//         desc: 'Comfortable and stylish classic white cotton shirt for all occasions.',
//         price: 50,
//         trendingProductName: 'Best Seller',
//         quantity: 1,
//         category: 'shirt'
//       },
//       {
//         id: 4,
//         image: 'https://i.pinimg.com/564x/8b/67/33/8b6733a8d34a4f4b9a2b9d8f3a25e5e5.jpg',
//         title: 'Vintage Leather Jacket',
//         desc: 'High-quality vintage leather jacket for a bold and stylish look.',
//         price: 350,
//         trendingProductName: 'Trending',
//         quantity: 1,
//         category: 'jacket'
//       },
//       {
//         id: 5,
//         image: 'https://i.pinimg.com/564x/5a/53/15/5a53154a987b4d1bba2e7f6e59c3e46c.jpg',
//         title: 'Ultra-Modern Smartphone',
//         desc: 'Feature-packed ultra-modern smartphone with a stunning display and powerful performance.',
//         price: 999,
//         trendingProductName: 'Hot Deal',
//         quantity: 1,
//         category: 'mobile'
//       },
//       {
//         id: 6,
//         image: 'https://i.pinimg.com/564x/6f/70/42/6f7042809d4dba2586ed5a99e77c454a.jpg',
//         title: 'Gaming Laptop Pro',
//         desc: 'High-performance gaming laptop with the latest graphics and processing power.',
//         price: 2000,
//         trendingProductName: 'Editor\'s Pick',
//         quantity: 1,
//         category: 'laptop'
//       },
//       {
//         id: 7,
//         image: 'https://i.pinimg.com/564x/72/2d/0f/722d0f4ff87e4a3bb15443d44730ed3d.jpg',
//         title: 'Running Sneakers',
//         desc: 'Comfortable and durable running sneakers for all your fitness activities.',
//         price: 85,
//         trendingProductName: 'Must Have',
//         quantity: 1,
//         category: 'shoes'
//       },
//       {
//         id: 8,
//         image: 'https://i.pinimg.com/564x/a1/8a/f5/a18af5ec0a8d40e0be0c48bce19635a8.jpg',
//         title: 'Inspirational Self-Help Book',
//         desc: 'A must-read inspirational self-help book that will change your perspective on life.',
//         price: 25,
//         trendingProductName: 'Top Read',
//         quantity: 1,
//         category: 'books'
//       }
//   ];
  

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity : 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });


    // Add Product Function
    const addProductFunction = async () => {
        if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Add product successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add product failed");
        }

    }
    return (
        <Layout>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="border border-[#00ADB5] px-8 py-6 rounded-xl shadow-xl">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-[#00ADB5] '>
                            Add Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Product Title'
                            className=' text-[#00ADB5] px-2 py-2 w-96 rounded-md border placeholder-black'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Product Price'
                            className='border text-[#00ADB5] px-2 py-2 w-96 rounded-md placeholder-black'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='border text-[#00ADB5] px-2 py-2 w-96 rounded-md placeholder-black'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            name="category"
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-[#00ADB5] border rounded-md placeholder-black">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-[#00ADB5] border rounded-md placeholder-black">

                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-[#00ADB5] hover:bg-[#00ADB5] w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddProductPage;