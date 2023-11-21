// Components
import Form from "../components/Form/Form";

// Icons
import { HiOutlineArrowLeft } from "react-icons/hi";

// Assets
import Image from "../assets/thumb-1.png";

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen text-[#010b13] bg-[#fdfeff] p-6">
      {/* Left */}
      <div
        className="flex flex-col items-center justify-center w-full h-[150px] md:h-[200px] lg:h-auto rounded-2xl"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {/* Right */}
      <Form />
    </div>
  );
}
