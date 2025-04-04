import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div className="lg:relative flex flex-col items-center justify-center lg:pt-0 pt-6 lg:flex-row w-full max-w-full"
    initial={{ opacity: 0 ,x:100}} animate={{ opacity: 1 , x:0}} transition={{ duration: 3 }}>
      <motion.div className="relative lg:absolute text-[#222831] top-24  left-0 sm:left-6 md:left-8 lg:left-16 flex flex-col gap-1 justify-center items-start w-full" 
      initial={{ opacity: 0 ,y:100}} animate={{ opacity: 1 , y:0}} transition={{ duration: 3 }}>
        <h1 className="w-1/3 text-5xl font-bold drop-shadow-xl tracking-wider leading-20">Effortless Inventory Control, Maximum Efficiency</h1>
        <hr className="w-1/3 sm:w-1/2 md:w-1/3 lg:w-1/4 h-1 rounded-lg bg-[#00ADB5]" />
        <h1 className="text-xs sm:text-base md:text-lg lg:text-xl tracking-widest">Track, Manage, and Optimize Your Inventory with Ease</h1>
      </motion.div>
      <img src="/Room - Relaxing - Copy@6-1536x742.png" alt="Online Shop" className="w-full  object-cover" />
    </motion.div>

  );
}

export default HeroSection;
