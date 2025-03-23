import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/CardSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModel/BuyNowModel";
import { Navigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: "", address: "", pincode: "", mobileNumber: "", time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });

    const buyNowFunction = async () => {
        if (!addressInfo.name || !addressInfo.address || !addressInfo.pincode || !addressInfo.mobileNumber) {
            return toast.error("All fields are required");
        }

        for (let item of cartItems) {
            const productRef = doc(fireDB, "products", item.id);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
                const productData = productSnap.data();
                if (item.quantity > productData.quantity) {
                    return toast.error(`Not enough stock for ${item.title}`);
                }
                await updateDoc(productRef, {
                    quantity: productData.quantity - item.quantity
                });
            }
        }

        const orderInfo = {
            cartItems, addressInfo, email: user.email, userid: user.uid, status: "confirmed",
            time: Timestamp.now(), date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
        };

        try {
            await addDoc(collection(fireDB, 'order'), orderInfo);
            toast.success("Order placed successfully");
        } catch (error) {
            console.error(error);
            toast.error("Order failed");
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section className="rounded-lg bg-white lg:col-span-8">
                            <ul className="divide-y divide-gray-200">
                                {cartItems.length > 0 ? cartItems.map((item, index) => (
                                    <li key={index} className="flex py-6 sm:py-6 ">
                                        <img src={item.productImageUrl} alt={item.title} className="h-24 w-24 rounded-md object-contain" />
                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                            <p className="text-sm font-medium text-gray-900">₹{item.price}</p>
                                            <div className="mb-2 flex">
                                                <button onClick={() => handleDecrement(item.id)} className="h-7 w-7">-</button>
                                                <input type="text" className="mx-1 h-7 w-9 border text-center" value={item.quantity} readOnly />
                                                <button onClick={() => handleIncrement(item.id)} className="h-7 w-7">+</button>
                                                <button onClick={() => deleteCart(item)} className="ml-6 flex text-sm items-center text-red-500">
                                                    <Trash size={12} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )) : <h1>No items in cart</h1>}
                            </ul>
                        </section>
                        <section className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0">
                            <h2 className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900">Price Details</h2>
                            <dl className="space-y-1 px-2 py-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-800">Price ({cartItemTotal} items)</dt>
                                    <dd className="text-sm font-medium text-gray-900">₹{cartTotal}</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="text-sm text-gray-800">Delivery Charges</dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-y border-dashed py-4">
                                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-gray-900">₹{cartTotal}</dd>
                                </div>
                            </dl>
                            <div className="px-2 pb-4 font-medium text-green-700">
                                {user ? <BuyNowModal addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNowFunction={buyNowFunction} /> : <Navigate to={'/login'} />}
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;