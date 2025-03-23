import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { doc, getDoc, setDoc } from "firebase/firestore";

const EmployeeDashboard = () => {
    const [leaveDate, setLeaveDate] = useState("");
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
            console.error("User ID is missing!");
            toast.error("User not authenticated.");
            return;
        }
    
        console.log("Applying leave for user:", user.uid);
    
        try {
            // const employeeRef = doc(fireDB, "employees", user.uid);
            // const docSnap = await getDoc(employeeRef);
    
            // if (!docSnap.exists()) {
            //     console.warn("Document does not exist, creating a new one.");
            //     await setDoc(employeeRef, { leaveCount: 1 }, { merge: true });
            //     setLeaveCount(1);
            // } else {
            //     await setDoc(employeeRef, { leaveCount: leaveCount + 1 }, { merge: true });
            //     setLeaveCount(leaveCount + 1);
            // }
    
            // Update localStorage
            const updatedUser = { ...user, leaveCount: leaveCount + 1 };
            setUser(updatedUser);
            localStorage.setItem("users", JSON.stringify(updatedUser));
    
            toast.success("Leave request submitted!");
            setLeaveDate("");
        } catch (error) {
            console.error("Error applying for leave:", error.message);
            toast.error("Failed to apply for leave.");
        }
    };
    

    return (
        <Layout>
            <h1>Employee Dashboard</h1>
            {user?.role === "employee" && (
                <li>
                    <Link to="/employee-dashboard">Hi, {user?.name}</Link>
                </li>
            )}

            <p className="mt-4">
                Total Leaves Applied: <span className="font-bold">{leaveCount}</span>
            </p>

            <div>
                <input
                    type="date"
                    value={leaveDate}
                    onChange={(e) => setLeaveDate(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                />
                <button
                    onClick={applyForLeave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Apply for Leave
                </button>
            </div>
        </Layout>
    );
};

export default EmployeeDashboard;
