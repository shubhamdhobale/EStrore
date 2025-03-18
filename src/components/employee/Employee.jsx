import { Link } from "react-router-dom";

const Employee = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-gray-100">
      {/* Employee Management Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center border border-gray-300 hover:shadow-2xl transition-all duration-300">
        <h1 className="text-2xl font-bold text-[#00ADB5] mb-4">👨‍💼 Employee Management</h1>
        <div className="flex flex-col gap-4">
          <Link 
            to='/addemployee' 
            className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            ➕ Add Employee
          </Link>
          <Link 
            to='/employeedata' 
            className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
          >
            📊 Employee Data
          </Link>
        </div>
      </div>

      {/* Offer Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center border border-gray-300 hover:shadow-2xl transition-all duration-300">
        <h1 className="text-2xl font-bold text-[#00ADB5] mb-4">🎉 Offer Section</h1>
        <div className="flex flex-col gap-4">
          <Link 
            to='/seasonwiseoffer' 
            className="px-5 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
          >
            🌸 Seasonwise Offer
          </Link>
          <Link 
            to='/currentoffer' 
            className="px-5 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
          >
            🔥 Current Offer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Employee;
