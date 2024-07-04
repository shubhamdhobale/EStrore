import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const ProductDetail = () => {
    return (
        <Layout>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-[#00ADB5] font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                <button className="px-5 py-2 bg-[#00ADB5] border border-[#00ADB5] rounded-lg">Add Product</button>
                </Link>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto px-10 py-10">
                <table className="w-full text-left border border-collapse sm:border-separate border-[#00ADB5] text-[#00ADB5]" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-[#00ADB5] text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00ADB5] text-slate-700 bg-slate-100">Location Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00ADB5] text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00ADB5] text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        <tr className="text-[#00ADB5]">
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00ADB5] stroke-slate-500 text-slate-500 ">
                                1.
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00ADB5] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                {'name'}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00ADB5] stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                Edit
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00ADB5] stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                Delete
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default ProductDetail;