// Icons
import { TfiBoltAlt } from "react-icons/tfi";

// CSS
import "./common.css";

export default function Button({ label, icon }) {
  const iconComponents = {
    TfiBoltAlt,
  };

  const IconComponent = iconComponents[icon];

  return (
    <div className="button flex items-center cursor-pointer font-medium text-lg border-2 border-[#010b13] text-[#010b13] px-3 py-1 rounded-full gap-2 group">
      <p className="label bg-[#fdfeff] z-10">{label}</p>
      {IconComponent && (
        <IconComponent className="icon rounded-full stroke-2 group-hover:stroke-[1px] transition-all duration-300 ease-in-out" />
      )}
    </div>
  );
}
