import  { useEffect, useState } from "react";
import { fireDB } from "../../firebase/FirebaseConfig.js";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Layout from "../layout/Layout.jsx";
import toast from "react-hot-toast";

const EmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees data
        const employeesSnapshot = await getDocs(collection(fireDB, "employees"));
        const employeesList = employeesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch leaveRequests data
        const leaveRequestsSnapshot = await getDocs(collection(fireDB, "leaveRequests"));
        const leaveRequestsList = leaveRequestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Merge data based on employee name
        const mergedData = employeesList.map((employee) => {
          const leaveRequest = leaveRequestsList.find(
            (leave) => leave.name === employee.name
          );

          return {
            ...employee,
            leaveCount: leaveRequest ? leaveRequest.leaveCount : 0,
            leaves: leaveRequest ? leaveRequest.leaves : [],
            leaveRequestId: leaveRequest ? leaveRequest.id : null,
          };
        });

        setEmployees(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreditSalary = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleLeaveApproval = async (employeeId, approve) => {
        // console.log("Updating leave for employee ID:", employeeId);

        try {
          const updatedEmployees = await Promise.all(
            employees.map(async (emp) => {
              if (emp.id === employeeId && emp.leaveRequestId) {
                const updatedLeaves = emp.leaves.map((leave) => {
                  if (leave.status === "pending") {
                    return { ...leave, status: approve ? "accepted" : "rejected" };
                  }
                  return leave;
                });
      
                const newLeaveCount = approve
                  ? Math.max(emp.leaveCount - 1, 0)
                  : emp.leaveCount;
      
                await updateDoc(doc(fireDB, "leaveRequests", emp.leaveRequestId), {
                  leaveCount: newLeaveCount,
                  leaves: updatedLeaves,
                });
      
                toast.success(`Leave ${approve ? "approved" : "rejected"} successfully`);
                return {
                  ...emp,
                  leaveCount: newLeaveCount,
                  leaves: updatedLeaves,
                };
              }
              return emp;
            })
          );
          
          setEmployees(updatedEmployees);
        } catch (error) {
          console.error("Error updating leave status:", error);
          toast.error("Failed to update leave status");
        }
      };
      

  return (
    <Layout>
        <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
        Employee Leave Dashboard
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Leave Count</th>
              <th className="px-4 py-3 text-left">Actual Salary</th>
              <th className="px-4 py-3 text-left">Credited Salary</th>
              <th className="px-4 py-3 text-left">Leave Details</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {employees.map((emp , index) => (
              <tr key={`${emp.id}-${index}`} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.role}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3 text-center">{emp.leaveCount}</td>
                <td className="px-4 py-3">{emp.salary}</td>
                <td className="px-4 py-3 text-green-700 font-semibold">
                    ₹
                    {(() => {
                        const totalSalary = parseFloat(emp.salary) || 0;
                        const leaveCount = parseInt(emp.leaveCount) || 0;
                        const perDaySalary = totalSalary / 30;
                        const deducted = leaveCount * perDaySalary;
                        const calculated = totalSalary - deducted;
                        return calculated.toFixed(2);
                    })()}
                </td>

                <td className="px-4 py-3">
                  {emp.leaves.length > 0 ? (
                    <ul className="space-y-1 list-disc list-inside">
                      {emp.leaves.map((leave, index) => (
                        <li key={index}>
                          <span className="font-medium">Date:</span> {leave.date},{" "}
                          <span className="font-medium">Reason:</span> {leave.reason},{" "}
                          <span className="font-medium">Status:</span> {leave.status}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="italic text-gray-500">No Leave Requests</span>
                  )}
                </td>
                <td className="flex gap-2 justify-center items-center pt-4">
                  <div className="flex items-center justify-center gap-2 ">
                    <button
                          onClick={() => handleLeaveApproval(emp.id, true)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold text-sm rounded"
                      >
                          Approve Leave
                      </button>
                      <button
                          onClick={() => handleLeaveApproval(emp.id, false)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm rounded"
                      >
                          Reject Leave
                      </button>
                  </div>
                    
                </td>
                <td className="border px-4 py-2">
                    <button
                        onClick={() => handleCreditSalary(emp)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm rounded"
                    >
                        Credit Salary
                    </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

         {/* Popup Modal for Salary Credited */}
         {selectedEmployee && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold text-green-600">
                    Salary Credited to {selectedEmployee.name}!
                </h3>
                <p className="text-gray-600">
                  Salary of ₹
                  {(() => {
                    const totalSalary = parseFloat(selectedEmployee.salary) || 0;
                    const leaveCount = parseInt(selectedEmployee.leaveCount) || 0;
                    const perDaySalary = totalSalary / 30;
                    const deducted = leaveCount * perDaySalary;
                    const calculated = totalSalary - deducted;
                    return calculated.toFixed(2);
                  })()}{" "}
                  has been credited successfully.
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
    </div>
    </Layout>
    
  );
};

export default EmployeeData;
