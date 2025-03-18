import { useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const offers = [
  {
    season: "☀️ Summer Sale",
    details: "Get up to 50% off on all summer collections! Grab the best deals on cotton T-shirts and comfy wear.",
  },
  {
    season: "☔ Monsoon Bonanza",
    details: "Buy 2 and get 1 free on all rainwear essentials. Stay stylish even in the rain!",
  },
  {
    season: "❄️ Winter Wonderland",
    details: "Flat 40% off on all winter jackets and woolen sweaters. Keep warm in style!",
  },
  {
    season: "🌸 Spring Festival",
    details: "Enjoy a refreshing 30% discount on floral prints and vibrant colors this spring season!",
  },
];

const SeasonwiseOffer = () => {
  const [loading, setLoading] = useState(Array(offers.length).fill(false));
  const navigate = useNavigate();
  const sendOffer = (index) => {
    if (loading[index]) return; 

    const newLoadingState = [...loading];
    newLoadingState[index] = true;
    setLoading(newLoadingState);

    setTimeout(() => {
      toast.success(`Offer sent successfully: ${offers[index].season}`);
      newLoadingState[index] = false;
      setLoading([...newLoadingState]);
    }, 2000);
  };

  const handleClick = () => {
    navigate("/admin-dashboard");
  }

  return (
    <Layout>
      <div className="py-10 bg-gray-50 min-h-screen">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          🎉 Seasonal Offers Just for You!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto max-w-5xl">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold text-[#00ADB5] mb-2">{offer.season}</h3>
              <p className="text-gray-600">{offer.details}</p>
              <button
                onClick={() => sendOffer(index)}
                disabled={loading[index]}
                className={`mt-4 w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                  loading[index]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500"
                }`}
              >
                {loading[index] ? "Sending..." : "Send Offer 🚀"}
              </button>
            </div>
          ))}
        </div>
        <button className="text-[#00ADB5] font-bold relative mt-10 left-1/2 " onClick={handleClick}>back</button>
      </div>

    </Layout>
  );
};

export default SeasonwiseOffer;
