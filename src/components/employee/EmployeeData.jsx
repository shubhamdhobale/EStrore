import { useEffect, useState, useContext } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";

const EmployeeData = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllUserFunction } = context;
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    useEffect(() => {
        fetchEmployees();
    }, []);

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

    const handleLeaveApproval = async (employeeId, isApproved) => {
        try {
            const employeeRef = doc(fireDB, "employees", employeeId);
            const employeeSnapshot = await getDocs(collection(fireDB, "employees"));
            const employeeData = employeeSnapshot.docs.find(doc => doc.id === employeeId)?.data();

            if (!employeeData) {
                toast.error("Employee not found.");
                return;
            }

            let updatedLeaveCount = employeeData.leaveCount;
            let message = `Your leave request has been rejected.`;

            if (isApproved) {
                if (updatedLeaveCount === 0) {
                    toast.error("No leave available to approve.");
                    return;
                }
                updatedLeaveCount -= 1;
                message = `Your leave request has been approved.`;
            }

            await updateDoc(employeeRef, {
                leaveCount: updatedLeaveCount,
                notifications: arrayUnion({
                    message: message,
                    timestamp: new Date().toISOString()
                })
            });

            setEmployees(prevEmployees =>
                prevEmployees.map(emp =>
                    emp.id === employeeId ? { ...emp, leaveCount: updatedLeaveCount } : emp
                )
            );

            toast.success(message);
        } catch (error) {
            console.error("Error updating leave:", error);
            toast.error("Failed to update leave status.");
        }
    };

    const handleClick = () => {
        navigate('/admin-dashboard');
    };

    // Open modal to confirm salary credit
    const handleCreditSalary = (employee) => {
        setSelectedEmployee(employee);
    };

    // const handleLeaveAction = async (employeeId, leaveIndex, action) => {
    //     try {
    //         const employeeRef = doc(fireDB, "employees", employeeId);
    //         const employeeSnap = await getDoc(employeeRef);
    
    //         if (employeeSnap.exists()) {
    //             let employeeData = employeeSnap.data();
    //             let updatedLeaves = [...employeeData.leaveRequests];
    
    //             if (action === "Accept") {
    //                 updatedLeaves[leaveIndex].status = "Approved";
    //             } else {
    //                 updatedLeaves[leaveIndex].status = "Rejected";
    //             }
    
    //             await updateDoc(employeeRef, { leaveRequests: updatedLeaves });
    //             toast.success(`Leave ${action.toLowerCase()}ed successfully!`);
    
    //             fetchEmployees(); // Refresh UI
    //         }
    //     } catch (error) {
    //         console.error("Error updating leave status:", error);
    //         toast.error("Failed to update leave status.");
    //     }
    // };
    

    return (
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-[#00ADB5] mb-4">Employee List</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Role</th>
                                <th className="border px-4 py-2">Leave</th>
                                <th className="border px-4 py-2">Salary</th>
                                <th className="border px-4 py-2">Actions</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id} className="text-center">
                                    <td className="border px-4 py-2">{employee.name}</td>
                                    <td className="border px-4 py-2">{employee.email}</td>
                                    <td className="border px-4 py-2">{employee.role}</td>
                                    <td className="border px-4 py-2">{employee.leaveCount}</td>
                                    <td className="border px-4 py-2">{employee.salary}</td>
                                    <td className="border px-4 py-2 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleLeaveApproval(employee.id, true)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                                        >
                                            Approve Leave
                                        </button>
                                        <button
                                            onClick={() => handleLeaveApproval(employee.id, false)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        >
                                            Reject Leave
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleCreditSalary(employee)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                        >
                                        Credit Salary
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button className="text-[#00ADB5] font-bold relative mt-6 left-1/2" onClick={handleClick}>
                    Back
                </button>

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
