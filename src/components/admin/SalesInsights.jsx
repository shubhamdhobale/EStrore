import { useContext, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement } from "chart.js";
import myContext from "../../context/myContext";
import { subDays, subWeeks, subMonths, isAfter } from "date-fns";

// Register required components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement);

const SalesInsights = () => {
    const context = useContext(myContext);
    const { getAllOrder } = context;
    const [filter, setFilter] = useState("tillDate");

    if (!Array.isArray(getAllOrder)) {
        return <p>Loading sales data...</p>; 
    }

    // Define filter logic
    const filterOrdersByDate = (orders, filterType) => {
        const now = new Date();
        return orders.filter(order => {
            const orderDate = new Date(order.date); 

            switch (filterType) {
                case "daily":
                    return isAfter(orderDate, subDays(now, 1));
                case "weekly":
                    return isAfter(orderDate, subWeeks(now, 1));
                case "monthly":
                    return isAfter(orderDate, subMonths(now, 1));
                case "tillDate":
                default:
                    return true;
            }
        });
    };

    // Get filtered orders based on selected time interval
    const filteredOrders = filterOrdersByDate(getAllOrder, filter);

    // Group sales data by category
    const categorySales = {};
    filteredOrders.forEach(order => {
        if (Array.isArray(order.cartItems)) {
            order.cartItems.forEach(item => {
                const { category, price, quantity } = item;

                if (!categorySales[category]) {
                    categorySales[category] = { quantity: 0, revenue: 0 };
                }

                categorySales[category].quantity += quantity;
                categorySales[category].revenue += price * quantity;
            });
        }
    });

    // Prepare data for Bar Chart (Quantity per Category)
    const barChartData = {
        labels: Object.keys(categorySales),
        datasets: [{
            label: "Total Quantity Sold",
            data: Object.values(categorySales).map(data => data.quantity),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        }],
    };

    // Prepare data for Pie Chart (Revenue Distribution)
    const pieChartData = {
        labels: Object.keys(categorySales),
        datasets: [{
            label: "Revenue Distribution",
            data: Object.values(categorySales).map(data => data.revenue),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
            hoverOffset: 4,
        }],
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl text-black font-bold text-center mb-6">Sales Insights</h1>

            {/* Filter Options */}
            <div className="flex justify-center space-x-4 mb-6">
                {["daily", "weekly", "monthly", "tillDate"].map((option) => (
                    <button
                        key={option}
                        onClick={() => setFilter(option)}
                        className={`px-4 py-2 rounded-md ${
                            filter === option ? "bg-[#00ADB5] text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart - Total Quantity Sold per Category */}
                <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold text-center mb-4">Total Quantity Sold per Category</h2>
                    <Bar data={barChartData} />
            </div>

            {/* Pie Chart - Revenue Distribution per Category */}
            <div className="bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold text-center mb-4">Revenue Distribution</h2>
                <Pie data={pieChartData} className="w-40"/>
            </div>
                
            </div>
        </div>
    );
};

export default SalesInsights;
