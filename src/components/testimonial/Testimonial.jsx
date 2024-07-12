/* eslint-disable react/no-unescaped-entities */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FaUser } from "react-icons/fa6"

const Testimonial = () => {
  return (
      <div>
          <section className="text-gray-600 body-font mb-10">
              {/* main  */}
              <div className="container px-5 py-10 mx-auto">
                  {/* Heading  */}
                  <h1 className=' text-center text-3xl font-bold text-black' >Testimonial</h1>
                  {/* para  */}
                  <h2 className=' text-center text-2xl font-semibold mb-10' >What our <span className=' text-[#00ADB5]'>customers</span> are saying</h2>

                  <div className="flex flex-wrap -m-4">
                      {/* Testimonial 1 */}
                      <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                          <div className="h-full text-center">
                            <FaUser  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" />
                              <p className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                              <span className="inline-block h-1 w-10 rounded bg-[#00ADB5] mt-6 mb-4" />
                              <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Kamal Nayan Upadhyay</h2>
                              <p className="text-gray-500">Senior Product Designer</p>
                          </div>
                      </div>

                      {/* Testimonial 2 */}
                      <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                          <div className="h-full text-center">
                              <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://www.devknus.com/img/gawri.png" />
                              <p className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                              <span className="inline-block h-1 w-10 rounded bg-[#00ADB5] mt-6 mb-4" />
                              <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">S Mishra</h2>
                              <p className="text-gray-500">UI Develeoper</p>
                          </div>
                      </div>

                      {/* Testimonial 3 */}
                      <div className="lg:w-1/3 lg:mb-0 p-4">
                          <div className="h-full text-center">
                          {/* <FontAwesomeIcon icon="fa-solid fa-user" />                               */}
                          <img src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg" alt="" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"/>
                          <p className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                              <span className="inline-block h-1 w-10 rounded bg-[#00ADB5
] mt-6 mb-4" />
                              <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">XYZ </h2>
                              <p className="text-gray-500">CTO</p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default Testimonial