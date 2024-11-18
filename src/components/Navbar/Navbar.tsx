import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className=" sticky top-0 w-screen h-fit p-4 bg-white border-solid border-b-gray-300 border-[1px] border-t-0 border-l-0 border-r-0 flex justify-between ">
      <Link className="flex justify-center" to="/">
        <img
          src="https://www.str8bat.com/cdn/shop/files/Logo.png?v=1677442424&width=500"
          alt="str8bat logo"
          width={80}
        />
      </Link>
    </div>
  );
}
