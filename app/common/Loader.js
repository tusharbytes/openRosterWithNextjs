"use client"

const Loader = () => {
 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#bfc6e1dc] bg-opacity-75 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-4 border-[#2bb2d7] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
