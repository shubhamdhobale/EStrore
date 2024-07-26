import {   FaShoppingBasket } from "react-icons/fa";
import { FaHouseChimney, FaLaptop } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Track = () => {


  return (
      <section>
          <div className=" container mx-auto px-5 py-10 md:py-14">
              {/* main  */}
              <div className="flex flex-wrap -m-4 text-center">
                  {/* Track 1 */}
                  <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                  <Link to="/category/shirt">
                      <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <FaShoppingBasket className="text-[#00ADB5]  w-12 h-12 mb-3 inline-block"/>
                          <h2 className="title-font font-medium text-lg text-gray-900" >Premium shirts</h2>
                          <p className="leading-relaxed">Our T-Shirts are 100% made of cotton.
                          </p>
                      </div>
                  </Link>
                  </div>

                  {/* Track 2 */}
                  <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                  <Link to="/category/home">
                      <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <FaHouseChimney className="text-[#00ADB5]  w-12 h-12 mb-3 inline-block"/>
                          <h2 className="title-font font-medium text-lg text-gray-900" >Home Appliances</h2>
                          <p className="leading-relaxed">Stylish design to make your life easier and more comfortable</p>
                      </div>
                  </Link>
                  </div>

                  {/* Track 3  */}
                  <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                  <Link to="/category/mobile">
                      <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                          <FaLaptop className="text-[#00ADB5]  w-12 h-12 mb-3 inline-block"/>
                          <h2 className="title-font font-medium text-lg text-gray-900" >Mobile and Laptops</h2>
                          <p className="leading-relaxed">top-notch performance, sleek designs, and advanced features</p>
                      </div>
                  </Link>
                  </div>

              </div>
          </div>
      </section>
  );
}

export default Track;