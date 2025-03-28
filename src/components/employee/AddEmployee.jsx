/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { addDoc , Timestamp , collection } from "firebase/firestore";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";



const AddEmployee = () => {
    const context = useContext(myContext);
    const {loading , setLoading } = context;
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        name:"",
        email: "",
        role:"sales",
        salary : "",
    })

    const handleSubmit = async () => {
        const { name, email, role, salary , leaveCount} = formData;
    
        if (!name || !role || !email || !salary) {
            return toast.error("All Fields are required");
        }
    
        setLoading(true);
    
        try {
            const password = `12345678`;
    
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
    
            const employeeData = {
                id: userId,
                name,
                email,
                role,
                leaveCount: 0, // Set leaveCount to 0 initially
                salary: Number(salary),
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            };
            
    
            // Store employee data in Firestore "employees" collection
            await addDoc(collection(fireDB, "employees"), employeeData);
            await addDoc(collection(fireDB, "user"), {
                uid: userId,
                name,
                email,
                role: "employee",
                leaveCount: Number(leaveCount),
                salary: Number(salary),
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            });

            toast.success("Employee added successfully! Credentials stored.");
            setLoading(false);
            navigate("/admin-dashboard");
    
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error("Failed to add employee: " + error.message);
            setLoading(false);
        }
    };
    
    
  

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            })
    }

    const handleClick = () => {
        navigate('/admin-dashboard');
    }

    return (
        <Layout>
        <div className='flex justify-center items-center h-screen flex-col gap-4'>
            {loading && <Loader/>}
            {/* Login Form  */}
            <div className="login_Form  px-1 lg:px-8 py-6 border border-[#00ADB5] rounded-xl shadow-md">
                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-[#00ADB5] '>
                        Add Employee
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Role'
                        value={formData.role}
                        onChange={handleChange}
                        name="role"
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="number"
                        placeholder='Salary'
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className=' border border-[#00ADB5] px-2 py-2 w-96 rounded-md outline-none placeholder-[#00ADB5]'
                    />
                </div>

                <div className="mb-5">
                    <button
                    onClick={handleSubmit}
                        type='button'
                        className='bg-[#00ADB5] hover:bg-[#00ADB5] w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Submit
                    </button>
                </div>
            </div>

            <button className="text-[#00ADB5] font-bold" onClick={handleClick}>back</button>
        </div>
        
            
        </Layout>
    );
}

export default AddEmployee;