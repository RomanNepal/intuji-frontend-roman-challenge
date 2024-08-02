import { getLastActiveInfo } from "@/utils/time";
import Image from "next/image";
import React from "react";
interface ListCardProps {
  name: string;
  status: string;
  last_active: string;
  image_url: string;
  category: string;
  selected: boolean;
  onClick: () => void;
}

const ListCard: React.FC<ListCardProps> = ({
  name,
  status,
  last_active,
  image_url,
  category,
  selected,
  onClick,
}) => {
  const { timeString, color } = getLastActiveInfo(last_active);
  return (
    <div
      onClick={onClick}
      className={`py-4 px-8 flex justify-between items-center ${
        category === "member" ? " cursor-pointer " : ""
      } ${selected ? " bg-gray-100" : ""}`}
    >
      <div className="w-1/2 flex items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="w-full h-full aspect-square rounded-full overflow-hidden mr-4 relative">
            <Image fill src={image_url} alt={name} objectFit="cover" />
          </div>
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white`}
            style={{ backgroundColor: color }}
          ></span>
        </div>
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-gray-500">{timeString}</p>
        </div>
      </div>
      <div className="w-1/2 text-right">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
    </div>
  );
};

export default ListCard;
