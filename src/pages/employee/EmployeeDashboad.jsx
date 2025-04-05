import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";



const EmployeeDashboard = () => {
    const [leaveDate, setLeaveDate] = useState("");
    const [leaveReason, setLeaveReason] = useState("");
    const [leaveCount, setLeaveCount] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem("users");
        if (userString) {
            try {
                const parsedUser = JSON.parse(userString);
                setUser(parsedUser);
                setLeaveCount(parsedUser?.leaveCount || 0);
            } catch (error) {
                console.error("Failed to parse user data:", error.message);
            }
        }
    }, []);


const applyForLeave = async () => {
    if (!user?.uid) {
        toast.error("User not authenticated.");
        return;
    }
    if (!leaveDate || !leaveReason) {
        toast.error("Please provide a leave date and reason.");
        return;
    }

    try {
        const userDocRef = doc(fireDB, "leaveRequests", user.uid);
        const docSnap = await getDoc(userDocRef);

        let updatedLeaveCount = 1;
        let updatedLeaves = [
            {
                date: leaveDate,
                reason: leaveReason,
                status: "Pending"
            }
        ];

        if (docSnap.exists()) {
            const existingData = docSnap.data();
            updatedLeaveCount = (existingData.leaveCount || 0) + 1;
            updatedLeaves = [...(existingData.leaves || []), ...updatedLeaves];
        }

        await setDoc(userDocRef, {
            userId: user.uid,
            name: user.name,
            email:user.email,
            leaveCount: updatedLeaveCount,
            leaves: updatedLeaves
        });

        const updatedUser = {
            ...user,
            leaveCount: updatedLeaveCount,
        };
        localStorage.setItem("users", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setLeaveCount(updatedLeaveCount);
        setLeaveDate("");
        setLeaveReason("");

        toast.success("Leave request submitted!");
    } catch (error) {
        console.error("Error applying for leave:", error.message);
        toast.error("Failed to apply for leave.");
    }
};
  

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-20">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Employee Dashboard</h1>

                {user?.role === "employee" && (
                    <p className="text-center text-lg text-gray-600">Hi, {user?.name || "Employee"}</p>
                )}
                
                <p className="mt-4 text-lg font-semibold text-gray-700">
                    Total Leaves Applied: <span className="text-blue-500">{leaveCount}</span>
                </p>
                
                <div className="mt-6 space-y-4">
                    <label className="block text-gray-700 font-medium">Select Leave Date</label>
                    <input
                        type="date"
                        value={leaveDate}
                        onChange={(e) => setLeaveDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                    
                    <label className="block text-gray-700 font-medium">Reason for Leave</label>
                    <textarea
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        placeholder="Enter reason for leave..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                    
                    <button
                        onClick={applyForLeave}
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Apply for Leave
                    </button>
                </div>
            </div> 
        </Layout>
    );
};

export default EmployeeDashboard;