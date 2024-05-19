import { useState } from "react";
import { FaBlogger } from "react-icons/fa6";
import {
  MdHome,
  MdOutlineForwardToInbox,
  MdAdminPanelSettings,
  MdOutlineSupervisorAccount,
} from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { PiChalkboardSimpleBold } from "react-icons/pi";
import { LiaArrowRightSolid } from "react-icons/lia";
import icon from "../../assets/PNG_WT_LOGO.png";

// eslint-disable-next-line react/prop-types
function SideBar({ index_pass }) {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Home Page", src: <MdHome />, href: "/admin" },
    { title: "Inpox", src: <MdOutlineForwardToInbox />, href: "/admin/admin_inbox" },
    {
      title: "Create Admin Accounts",
      src: <MdAdminPanelSettings />,
      gap: false,
      href: "/admin/create_admin_account",
    },
    {
      title: "Clint",
      src: <MdOutlineSupervisorAccount />,
      href: "/admin/admin_clint",
    },
    { title: "Settings", src: <TbSettings />, href: "/admin/admin_settings" },
    {
      title: "Portfolio",
      src: <PiChalkboardSimpleBold />,
      gap: false,
      href: "/admin_portfolo",
    },
    { title: "Blogs", src: <FaBlogger />, href: "/admin/admin_blog" },
    {
      title: "Intern Requirement",
      src: <FiBookOpen />,
      href: "/admin/admin_intern_rec",
    },
  ];
  return (
    <div>
      <div
        className={` ${
          open ? "w-72" : "w-20"
        } bg-blue-300 h-screen p-5 pt-8 relative duration-300`}
      >
        <div
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-purple-300 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <span>
            <LiaArrowRightSolid />
          </span>
        </div>
        <div className="flex gap-x-4 items-center">
          <img
            src={icon}
            alt=""
            className={`cursor-pointer duration-500 w-7 h-7 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Wolfrestech
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menus, index) => (
            <li key={index}>
              <a
                className={`flex rounded-md p-2 cursor-pointer group hover:bg-slate-50 text-gray-300 text-sm items-center gap-x-4
              ${Menus.gap ? "mt-9" : "mt-2"} ${
                  index === index_pass && "bg-slate-50"
                } ${!open && "tooltip hover:tooltip-open tooltip-right"}`}
                href={Menus.href}
                data-tip={Menus.title}
              >
                <div className="bg-black">{Menus.src}</div>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-black`}
                >
                  {Menus.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
