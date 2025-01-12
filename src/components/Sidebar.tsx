import { Tooltip } from "primereact/tooltip";
import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types/types";

interface MenuType {
  icon: string;
  label: string;
}

const menus: MenuType[] = [
  {
    icon: "pi-address-book",
    label: "Contacts",
  },
  {
    icon: "pi-heart",
    label: "Favorite",
  },
  {
    icon: "pi-box",
    label: "Archived",
  },
  {
    icon: "pi-trash",
    label: "Deleted",
  },
  {
    icon: "pi-tag",
    label: "Tags",
  },
  {
    icon: "pi-users",
    label: "Groups",
  },
];

const Sidebar: React.FC = () => {
  const { expanded } = useContext(AppContext) as AppContextType;
  return (
    <aside className="lg:block hidden h-screen">
      <nav className={`flex flex-col bg-white shadow-sm border-r h-full`}>
        <div className="flex justify-between items-center p-4 pb-2">
          <a href="index.html">
            <img
              src="/logo.svg"
              alt="Logo"
              className={`transition-all ${expanded ? "w-32" : "w-0"}`}
            />
          </a>
        </div>
        <ul className={`flex-1 px-3 mt-5`}>
          {menus.map((menu, index) => (
            <SidebarItem
              key={uuid()}
              item={menu}
              active={index <= 0}
              expanded={expanded}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  item: MenuType;
  active: boolean;
  expanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  active,
  expanded,
}) => {
  const { icon, label } = item;
  return (
    <li
      className={`group relative flex items-center font-medium rounded-md cursor-pointer py-2 px-3 my-1
        text-slate-400 h-10 ${
          active
            ? "bg-gradient-to-tr from-purple-500 to-purple-300 text-white hover:text-white"
            : "hover:bg-purple-50"
        } hover:text-purple-500 duration-500 transition-all`}
    >
      <i className={`pi ${icon} text-lg`}></i>
      <span className={`${expanded ? "block pl-2 w-52" : "hidden w-0"}`}>
        {label}
      </span>
      {label === "Contacts" && (
        <div
          className={`absolute right-2 opacity-65 hover:opacity-100 transition-opacity duration-300 ${
            expanded ? "block" : "hidden"
          }`}
        >
          <i
            className="hover:bg-purple-300 p-1.5 rounded-lg addcontact pi pi-plus"
            data-pr-tooltip="Add new contact"
          />
          <Tooltip target=".addcontact" position="top" />
        </div>
      )}
      {!expanded && (
        <div className="group-hover:visible group-hover:ml-5 left-full z-50 absolute bg-purple-500 px-3 py-1 rounded-lg text-sm text-white transition-all -translate-x-3 group-hover:translate-x-0 invisible">
          {label}
        </div>
      )}
    </li>
  );
};

export default Sidebar;
