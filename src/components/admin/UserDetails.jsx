import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;
    console.log(getAllUser)

    return (
        <div>
            <div>
                <div className="py-5 ">
                    <h1 className=" text-3xl text-center py-4 font-bold">All User</h1>
                </div>
                <div className="w-full overflow-x-auto py-8">
                    <table className="w-full border border-collapse sm:border-separate border-black" >
                        <tbody>
                            <tr className="bg-[#00acb57a]">
                                <th scope="col" className="h-12 px-6">S.No.</th>
                                <th scope="col" className="h-12 px-6 border-l border-black">Name</th>
                                <th scope="col" className="h-12 px-6 border-l border-black">Email</th>
                                <th scope="col" className="h-12 px-6 border-l border-black">Uid</th>
                                <th scope="col" className="h-12 px-6 border-l border-black">Role</th>
                                <th scope="col" className="h-12 px-6 border-l border-black">Date</th>
                            </tr>

                            {
                                getAllUser.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="h-12 px-6 border-t border-black">{index + 1}</td>
                                            <td className="h-12 px-6 border-t border-l border-black ">{value.firstname} {value.lastname}</td>
                                            <td className="h-12 px-6 border-t border-l border-black">{value.email}</td>
                                            <td className="h-12 px-6 border-t border-l border-black ">{value.uid}</td>
                                            <td className="h-12 px-6 border-t border-l border-black ">{value.role}</td>
                                            <td className="h-12 px-6 border-t border-l border-black">{value.date}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;