import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/CardSlice';
import toast from 'react-hot-toast';

const HomePageProductCard = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart || []);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success('Added to Cart');
    };

    const deleteCard = (item) => {
        dispatch(deleteFromCart(item));
        toast.success('Deleted from Cart');
    };

    useEffect(() => {
        localStorage.setItem('cart' , JSON.stringify(cartItems))
    } ,[cartItems])

    return (
        <div className="mt-10 py-8 shadow-2xl">
            <h1 className=" text-center mb-5 text-2xl font-semibold tracking-wider">Bestselling Products</h1>

        <section className="">
            <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-wrap -m-4">
                {getAllProduct.slice(0, 8).map((item, index) => {
                    const { id, title, price, productImageUrl } = item;
                    return (
                        <div key={index} className="p-4 w-full md:w-1/4">
                            <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-xl cursor-pointer">
                            <img
                                onClick={() => navigate(`/productinfo/${id}`)}
                                className="lg:h-80 h-96 w-full"
                                src={productImageUrl}
                                alt="product"
                            />
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">E-bharat</h2>
                                <h1 className="title-font text-md font-medium text-gray-900 mb-3 tracking-wider">
                                    {title.substring(0, 25)}
                                </h1>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                    ₹{price}
                                </h1>

                                <div className="flex justify-center">
                                    {cartItems.some((p) => p.id === item.id) ? (
                                        <button
                                            className="bg-[#00ADB5] w-full text-white py-[4px] rounded-lg font-semibold"
                                            onClick={() => deleteCard(item)}
                                        >Delete From Cart </button>
                                    ) : (
                                        <button
                                        className="bg-[#00ADB5] w-full text-white py-[4px] rounded-lg font-semibold"
                                        onClick={() => addCart(item)}
                                    >Add to Cart </button>
                                    )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        </div>
    );
};

export default HomePageProductCard;
