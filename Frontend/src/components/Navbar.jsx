/* eslint-disable no-unused-vars */
import {
  faHouseChimney,
  faMagnifyingGlass,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaMagnifyingGlassArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  const refreshPage = () => {
    window.location.href = window.location.href;
  };

  return (
    <>
      <div className="h-16 w-full bg-teal-800 font-[Poopins] text-white flex place-items-center justify-evenly text-2xl">
      <div className=" flex place-items-center justify-center gap-2 ml-20"> <a className="flex justify-center place-items-center gap-3" href="/About">
          <h2 className="text-5xl font-semibold">IMS</h2>
          <img
            className="h-14 w-14 object-contain"
            src="src\components\IMS_Home.png"
            alt=""
          /></a>
        </div>

        <div className="h-16 flex justify-center items-center font-['Poopins'] bg-teal-800 ml-40 gap-16 w-[1000px]">

          <Link className="text-lg hover:underline " to="/">
            Home <FontAwesomeIcon className="text-md" icon={faHouseChimney} />
          </Link>

          <Link className="text-lg hover:underline" to="/ShopkeeperDashboard">
            Shop Dash
          </Link>

          <Link className="text-lg hover:underline" to="/Products">
            Products
          </Link>
          <Link className="text-lg hover:underline" to="/NewProduct">
            Add Product <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link className="text-lg hover:underline" to="/Remove/:">
            Remove Product{" "}
            <FontAwesomeIcon className="text-md" icon={faTrash} />
          </Link>
          <Link className="text-lg hover:underline " to="/Search">
            Search{" "}
            <FontAwesomeIcon className="text-md" icon={faMagnifyingGlass} />{" "}
          </Link>

        </div>
      </div>
    </>
  );
};

export default Navbar;
