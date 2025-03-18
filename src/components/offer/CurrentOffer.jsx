import toast from "react-hot-toast";
import myContext from "../../context/myContext";
import Layout from "../layout/Layout";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

const CurrentOffer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState({}); 
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllUser } = context;

  useEffect(() => {
    const month = new Date().getMonth();
    let currentOffers = [];

    if (month >= 2 && month <= 4) {
      currentOffers = [
        { title: "Spring Special", discount: "20% Off", description: "Enjoy fresh deals this spring!" },
        { title: "Festival Discount", discount: "15% Off", description: "Exclusive festival sale is live!" }
      ];
    } else if (month >= 5 && month <= 7) {
      currentOffers = [
        { title: "Summer Sale", discount: "25% Off", description: "Beat the heat with cool discounts!" },
        { title: "Buy 1 Get 1 Free", discount: "BOGO Offer", description: "Limited time summer bonanza!" }
      ];
    } else if (month >= 8 && month <= 10) {
      currentOffers = [
        { title: "Monsoon Magic", discount: "30% Off", description: "Rainy season special discounts!" },
        { title: "Independence Day Offer", discount: "Flat 10% Off", description: "Celebrate freedom with savings!" }
      ];
    } else {
      currentOffers = [
        { title: "Winter Wonders", discount: "20% Off", description: "Stay warm with hot deals!" },
        { title: "Christmas & New Year Sale", discount: "Up to 50% Off", description: "Festive discounts on all items!" }
      ];
    }

    setOffers(currentOffers);
  }, []);

  const sendOffer = (offer, index) => {
    if (!getAllUser || getAllUser.length === 0) {
      toast.error("No users available to send offers.");
      return;
    }

    setLoading((prev) => ({ ...prev, [index]: true })); 
    setTimeout(() => {
      toast.success(`Offer "${offer.title}" sent successfully to ${getAllUser.length} users!`);
      setLoading((prev) => ({ ...prev, [index]: false })); 
    }, 2000);
  };

  const handleClick = () => {
    navigate('/admin-dashboard');
}

  return (
    <Layout>
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
        ✨ Exclusive Offers ✨
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div 
            key={index} 
            className="border border-gray-200 p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              {offer.title}
            </h3>
            <p className="text-lg font-semibold text-red-500 mb-3">
              {offer.discount}
            </p>
            <p className="text-gray-600 mb-4">{offer.description}</p>
            <button 
              onClick={() => sendOffer(offer, index)} 
              disabled={loading[index]} 
              className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 
              ${
                loading[index] 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500"
              }`}
            >
              {loading[index] ? "Sending..." : "🚀 Send Offer"}
            </button>
          </div>
        ))}
      </div>
      <button className="text-[#00ADB5] font-bold relative mt-10 left-1/2 " onClick={handleClick}>back</button>
    </div>

</Layout>

  );
};

export default CurrentOffer;
