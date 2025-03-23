import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SupplierData = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchsuppliers();
    }, []);

    // Fetch suppliers from Firestore
    const fetchsuppliers = async () => {
        setLoading(true);
        try {
            const employeeRef = collection(fireDB, "suppliers");
            const snapshot = await getDocs(employeeRef);
            const employeeList = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }));
            setSuppliers(employeeList);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            toast.error("Failed to load suppliers.");
        }
        setLoading(false);
    };

    // Delete Supplier from Firestore
    const deleteSupplier = async (id) => {
        if (!window.confirm("Are you sure you want to delete this Supplier?")) return;
        
        try {
            await deleteDoc(doc(fireDB, "suppliers", id));
            setSuppliers(suppliers.filter(emp => emp.id !== id)); // Update UI instantly
            toast.success("Supplier deleted successfully.");
        } catch (error) {
            console.error("Error deleting Supplier:", error);
            toast.error("Failed to delete Supplier.");
        }
    };

    const handleClick = () => {
        navigate('/admin-dashboard');
    }

    return (
        <Layout>
            <div className="p-6 ">
                <h2 className="text-2xl font-bold text-[#00ADB5] mb-4">Supplier List</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Supplier Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Category</th>
                                    <th className="border px-4 py-2">Address</th>
                                    <th className="border px-4 py-2">Contact</th>
                                    <th className="border px-4 py-2">Date Added</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map(supplier => (
                                    <tr key={supplier.id} className="text-center">
                                        <td className="border px-4 py-2">{supplier.name}</td>
                                        <td className="border px-4 py-2">{supplier.email}</td>
                                        <td className="border px-4 py-2">{supplier.category}</td>
                                        <td className="border px-4 py-2">{supplier.address}</td>
                                        <td className="border px-4 py-2">{supplier.contact}</td>
                                        <td className="border px-4 py-2">{supplier.date}</td>
                                        <td className="border px-4 py-2 flex gap-2 justify-center">
                                            <button
                                                onClick={() => deleteSupplier(supplier.id)}
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

               
            </div>
        </Layout>
    );
};

export default SupplierData;
