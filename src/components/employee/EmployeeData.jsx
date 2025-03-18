import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const EmployeeData = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Fetch employees from Firestore
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const employeeRef = collection(fireDB, "employees");
            const snapshot = await getDocs(employeeRef);
            const employeeList = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }));
            setEmployees(employeeList);
        } catch (error) {
            console.error("Error fetching employees:", error);
            toast.error("Failed to load employees.");
        }
        setLoading(false);
    };

    // Delete employee from Firestore
    const deleteEmployee = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        
        try {
            await deleteDoc(doc(fireDB, "employees", id));
            setEmployees(employees.filter(emp => emp.id !== id)); // Update UI instantly
            toast.success("Employee deleted successfully.");
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Failed to delete employee.");
        }
    };

    // Open modal to confirm salary credit
    const handleCreditSalary = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleClick = () => {
        navigate('/admin-dashboard');
    }

    return (
        <Layout>
            <div className="p-6 ">
                <h2 className="text-2xl font-bold text-[#00ADB5] mb-4">Employee List</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2">Salary</th>
                                    <th className="border px-4 py-2">Date Added</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee => (
                                    <tr key={employee.id} className="text-center">
                                        <td className="border px-4 py-2">{employee.name}</td>
                                        <td className="border px-4 py-2">{employee.email}</td>
                                        <td className="border px-4 py-2">{employee.role}</td>
                                        <td className="border px-4 py-2">{employee.salary}</td>
                                        <td className="border px-4 py-2">{employee.date}</td>
                                        <td className="border px-4 py-2 flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleCreditSalary(employee)}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                                            >
                                                Credit Salary
                                            </button>
                                            <button
                                                onClick={() => deleteEmployee(employee.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                            >
                                                Delete Record
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                <button className="text-[#00ADB5] font-bold relative mt-6 left-1/2 " onClick={handleClick}>back</button>

                {/* Popup Modal for Salary Credited */}
                {selectedEmployee && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-lg font-bold text-green-600">
                                Salary Credited to {selectedEmployee.name}!
                            </h3>
                            <p className="text-gray-600">
                                Salary of ₹{selectedEmployee.salary} has been credited successfully.
                            </p>
                            <button
                                onClick={() => setSelectedEmployee(null)}
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EmployeeData;
