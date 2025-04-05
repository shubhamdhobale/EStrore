import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc, updateDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

    // Fetch suppliers
    useEffect(() => {
        const fetchSuppliers = async () => {
            const supplierCollection = await getDocs(collection(fireDB, "suppliers"));
            const supplierList = supplierCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSuppliers(supplierList);
        };
        fetchSuppliers();
    }, []);

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const placeOrder = async (product) => {
        const supplier = suppliers.find(sup => sup.category === product.category);
        if (!supplier) {
            toast.error(`No supplier found for category: ${product.category}`);
            return;
        }

        const orderDetails = {
            productId: product.id,
            productName: product.title,
            category: product.category,
            quantityOrdered: 50, // Order default 50 units
            supplierName: supplier.name,
            supplierContact: supplier.contact,
            status: "Pending", // Initial status
            date: new Date().toLocaleString(),
        };

        try {
            await addDoc(collection(fireDB, "orders"), orderDetails);
            toast.success(`Order placed to ${supplier.name} for ${product.category}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
        }
    };

    const confirmOrder = async (product) => {
        try {
            const productRef = doc(fireDB, "products", product.id);
            await updateDoc(productRef, {
                quantity: product.quantity + 500 // Add ordered quantity
            });
            toast.success(`Stock updated for ${product.title}`);
            getAllProductFunction();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update stock");
        }
    };    

    return (
        <div>
            <div className="py-5">
                <h1 className="text-3xl text-center font-bold pt-4">All Products</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-[#00ADB5] font-bold rounded-lg">Add Product</button>
                </Link>
            </div>
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>
            <div className="w-full overflow-x-auto mb-5 py-8">
                <table className="w-full border border-collapse sm:border-separate border-black">
                    <tbody>
                        <tr className="bg-[#00acb57a]">
                            <th className="h-12 px-6">S.No.</th>
                            <th className="h-12 px-6 border-l border-black">Image</th>
                            <th className="h-12 px-6 border-l border-black">Title</th>
                            <th className="h-12 px-6 border-l border-black">Price</th>
                            <th className="h-12 px-6 border-l border-black">Quantity</th>
                            <th className="h-12 px-6 border-l border-black">Category</th>
                            <th className="h-12 px-6 border-l border-black">Date</th>
                            <th className="h-12 px-6 border-l border-black">Actions</th>
                        </tr>

                        {getAllProduct.map((item, index) => {
                            const { id, title, price, quantity, category, date, productImageUrl } = item;
                            return (
                                <tr key={index}>
                                    <td className="h-12 px-6 border-t border-black">{index + 1}.</td>
                                    <td className="h-12 px-6 border-t border-l border-black">
                                        <img className="w-20" src={productImageUrl} alt="" />
                                    </td>
                                    <td className="h-12 px-6 border-t border-l border-black">{title}</td>
                                    <td className="h-12 px-6 border-t border-l border-black">₹{price}</td>
                                    <td className={`h-12 px-6 border-t border-l border-black ${quantity < 20 ? "text-red-500 font-bold" : ""}`}>
                                        {quantity}
                                    </td>
                                    <td className="h-12 px-6 border-t border-l border-black">{category}</td>
                                    <td className="h-12 px-6 border-t border-l border-black">{date}</td>
                                    <td className="h-12 px-6 border-t border-l border-black">
                                        <button onClick={() => navigate(`/updateproduct/${id}`)} className="text-green-500 font-bold mr-4">Edit</button>
                                        <button onClick={() => deleteProduct(id)} className="text-red-500 font-bold">Delete</button>

                                        {quantity < 20 && (
                                            <button onClick={() => placeOrder(item)} className="bg-yellow-500 px-3 py-1 rounded-md ml-2 text-white">
                                                Order Now
                                            </button>
                                        )}

                                        {quantity < 20 && (
                                            <button onClick={() => confirmOrder(item)} className="bg-blue-500 px-3 py-1 rounded-md ml-2 text-white">
                                                Confirm Order
                                            </button>
                                        )}
                                    </td>
           

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductDetail;
