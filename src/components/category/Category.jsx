import { useNavigate } from "react-router";

const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/128/8863/8863863.png',
        name: 'fashion'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/2957/2957379.png',
        name: 'shirt'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/2806/2806045.png',
        name: 'jacket'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/3137/3137807.png',
        name: 'mobile'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/428/428001.png',
        name: 'laptop'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/2742/2742687.png',
        name: 'shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/3659/3659933.png',
        name: 'home'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/128/5832/5832416.png',
        name: 'books'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="py-4 shadow-2xl pb-12">
            <div className="flex flex-col mt-5">
                <h1 className="font-bold text-center text-2xl py-8">Shop by Category</h1>
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    <div className="flex">
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10 hover:text-blue-500 hover:underline duration-500 ">
                                    <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-[#00ADB5] transition-all hover:bg-[#1ab0b8] cursor-pointer mb-1"  >
                                        <div className="flex justify-center mb-12">
                                            <img src={item.image} alt="img" className="hover:scale-110 duration-700"/>
                                        </div>
                                    </div>
                                    <h1 className=' text-sm lg:text-lg text-center font-bold first-letter:uppercase'>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {-ms-overflow-style: none; scrollbar-width: none;}.hide-scroll bar::-webkit-scrollbar {display: none;}" }} />
        </div>
    );
}

export default Category;