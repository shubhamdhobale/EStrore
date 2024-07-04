import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div className="lg:relative flex flex-col items-center justify-center lg:pt-0 pt-6 lg:flex-row"
    initial={{ opacity: 0 ,x:100}} animate={{ opacity: 1 , x:0}} transition={{ duration: 3 }}>
      <motion.div className="relative lg:absolute text-[#222831] top-0 sm:top-20 md:top-24 lg:top-40 left-0 sm:left-6 md:left-8 lg:left-16 flex flex-col gap-1 justify-center items-start " 
      initial={{ opacity: 0 ,y:100}} animate={{ opacity: 1 , y:0}} transition={{ duration: 3 }}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold drop-shadow-xl">Your Online Shop</h1>
        <hr className="w-1/3 sm:w-1/2 md:w-1/3 lg:w-1/4 h-1 rounded-lg bg-[#00ADB5]" />
        <h1 className="text-xs sm:text-base md:text-lg lg:text-xl tracking-widest">24/7 Shop and Deliver anytime.!</h1>
      </motion.div>
      <img src="/Room - Relaxing - Copy@6-1536x742.png" alt="Online Shop" className="w-full  object-cover" />
    </motion.div>

  );
}

export default HeroSection;
