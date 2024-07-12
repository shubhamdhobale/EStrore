import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, deleteProduct } = context;

    return (
        <div>
            <div>
                <div className="py-5">
                    <h1 className="text-3xl text-black pt-4 font-bold text-center">All Order</h1>
                </div>
                <div className="w-full overflow-x-auto px-4 py-8">
                    <table className="w-full text-left border border-collapse sm:border-separate border-black" >
                        <tbody>
                          <tr className="bg-[#00acb57a]">
                            <th scope="col" className="h-12 px-6 text-md border-l ">S.No.</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Order Id</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Image</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Title</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Category</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Price</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Quantity</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Total Price</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Status</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Name</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Address</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Pincode</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Phone Number</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Email</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Date</th>
                            <th scope="col" className="h-12 px-6 border-l border-black">Action</th>
                          </tr>


                        {getAllOrder.map((order) => {
                            return (
                                <>
                                {order.cartItems.map((item, index) => {
                                    const { id, productImageUrl, title, category, price, quantity } = item
                                    return (
                                    <tr key={index}>
                                        <td className="h-12 px-6 border-t border-black">{index + 1}</td>
                                        <td className="h-12 px-6 border-t border-l border-black hover:text-blue-500 hover:underline cursor-pointer">{id}</td>
                                        <td className="h-12 px-6 border-t border-l border-black"><img src={productImageUrl}/></td>
                                        <td className="h-12 px-6 border-t border-l border-black">{title}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{category}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">₹{price}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{quantity}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">₹{price * quantity}</td>
                                        <td className="h-12 px-4 border-t border-l text-green-600  border-black font-bold">{order.status}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{order.addressInfo.name}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{order.addressInfo.address}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{order.addressInfo.pincode}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{order.addressInfo.mobileNumber}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{order.email}</td>
                                        <td className="h-12 px-6 border-t border-l border-black">{order.date}</td>
                                        <td className="h-12 px-6 border-t border-l border-black text-red-500 cursor-pointer " onClick={()=> deleteProduct(order.id)}>Delete</td>
                                    </tr>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;