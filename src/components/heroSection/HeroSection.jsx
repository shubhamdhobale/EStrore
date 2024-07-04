const HeroSection = () => {
  return (
    <div className="lg:relative flex flex-col items-center justify-center lg:flex-row">
      <div className="relative lg:absolute text-[#222831] top-0 sm:top-20 md:top-24 lg:top-28 left-0 sm:left-6 md:left-8 flex flex-col gap-1 justify-center items-start ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold drop-shadow-xl">Your Online Shop</h1>
        <hr className="w-1/3 sm:w-1/2 md:w-1/3 lg:w-1/4 h-1 rounded-lg bg-[#00ADB5]" />
        <h1 className="text-xs sm:text-base md:text-lg lg:text-xl tracking-widest">24/7 Shop and Deliver anytime.!</h1>
      </div>
      <img src="/Room - Relaxing - Copy@6-1536x742.png" alt="Online Shop" className="w-full  object-cover" />
    </div>
  );
}

export default HeroSection;
