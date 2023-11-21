// Icons
import { BiCast } from "react-icons/bi";

export default function MoreButton() {
  return (
    <div className="w-fit px-4 py-3 bg-[#fdfeff] border-0 rounded-full flex items-center gap-3 text-[#010b13] cursor-pointer hover:bg-gray-100 hover:scale-105 duration-200 transition-all ease-in-out">
      <BiCast className="w-5 h-5"/>
      <p className="text-sm md:text-base font-medium">See More</p>
    </div>
  );
}
