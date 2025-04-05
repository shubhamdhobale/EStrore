/* eslint-disable react/no-unescaped-entities */
// import { FaUser } from "react-icons/fa6";

const Testimonial = () => {
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        {/* Main Section */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-black">Testimonial</h1>
          <h2 className="text-center text-2xl font-semibold mb-10">
            What our <span className="text-[#00ADB5]">customers</span> are saying
          </h2>

          <div className="flex  justify-center">
            {/* Testimonial 1 */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img alt="testimonial" src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" />
                <p className="leading-relaxed">
                  "The quality of the T-shirts is amazing! The fabric is soft and comfortable, and the prints are just perfect. Highly recommended!"
                </p>
                <span className="inline-block h-1 w-10 rounded bg-[#00ADB5] mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Sheshrao Kawade</h2>
                <p className="text-gray-500">Backend Specialist</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://www.devknus.com/img/gawri.png" />
                <p className="leading-relaxed">
                  "I loved the seamless shopping experience! The website is easy to navigate, and the customer support was very responsive."
                </p>
                <span className="inline-block h-1 w-10 rounded bg-[#00ADB5] mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Shubhangi Mishra</h2>
                <p className="text-gray-500">UI Developer</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg" alt="" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" />
                <p className="leading-relaxed">
                  "Fast delivery and excellent packaging! The product was exactly as described. Will definitely shop again."
                </p>
                <span className="inline-block h-1 w-10 rounded bg-[#00ADB5] mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Abhishek Dewadkar</h2>
                <p className="text-gray-500">Entrepreneur</p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" />
                <p className="leading-relaxed">
                  "Great value for money! The premium T-shirts are worth every penny. The fit and quality exceeded my expectations."
                </p>
                <span className="inline-block h-1 w-10 rounded bg-[#00ADB5] mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Mayur Jathar</h2>
                <p className="text-gray-500">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
