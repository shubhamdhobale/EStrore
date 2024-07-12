import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate = useNavigate();


    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <div>
            <div className="py-5">
                <h1 className="text-3xl text-center font-bold pt-4">All Product</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-[#00ADB5] font-bold rounded-lg">Add Product</button>
                </Link>
            </div>
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>
            <div className="w-full overflow-x-auto mb-5 py-8">

                <table className="w-full border border-collapse sm:border-separate border-black" >
                    <tbody>
                        <tr className="bg-[#00acb57a]">
                            <th scope="col" className="h-12 px-6">S.No.</th>
                            <th scope="col" className="h-12 px-6  border-l border-black ">Image</th>
                            <th scope="col" className="h-12 px-6 border-l border-black  ">Title</th>
                            <th scope="col" className="h-12 px-6 border-l border-black  ">Price</th>
                            <th scope="col" className="h-12 px-6 border-l border-black  ">Category</th>
                            <th scope="col" className="h-12 px-6 border-l border-black  "> Date</th>
                            <th scope="col" className="h-12 px-6 border-l border-black  ">Action</th>
                            <th scope="col" className="h-12 px-6 border-l border-black  ">Action</th>
                        </tr>

                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={index}>
                                    <td className="h-12 px-6 border-t border-black">{index + 1}.</td>
                                    <td className="h-12 px-6 border-t border-l border-black">
                                        <img className="w-20 " src={productImageUrl} alt="" />
                                    </td>
                                    <td className="h-12 px-6 border-t border-l border-black first-letter:uppercase ">{title}</td>
                                    <td className="h-12 px-6 border-t border-l border-black first-letter:uppercase ">₹{price}</td>
                                    <td className="h-12 px-6 border-t border-l border-black first-letter:uppercase ">{category}</td>
                                    <td className="h-12 px-6 border-t border-l border-black first-letter:uppercase ">{date}</td>
                                    <td onClick={()=> navigate(`/updateproduct/${id}`)} className="h-12 px-6 border-t border-l border-black text-green-500 cursor-pointer font-bold">Edit</td>
                                    <td onClick={()=> deleteProduct(id)} className="h-12 px-6 border-t border-l border-black text-red-500 cursor-pointer font-bold">Delete</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;