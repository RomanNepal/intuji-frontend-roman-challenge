import React from "react";

const CardSkeleton = () => {
  return (
    <div className="py-4 px-8 flex justify-between items-center animate-pulse">
      <div className="w-1/2 flex items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="w-full h-full aspect-square rounded-full overflow-hidden mr-4 relative bg-gray-300"></div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-gray-300"></span>
        </div>
        <div className="flex flex-col">
          <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-1/2 text-right">
        <div className="h-4 w-16 bg-gray-300 rounded ml-auto"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
