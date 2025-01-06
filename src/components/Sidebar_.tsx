const Sidebar = () => {
  return (
    // <aside className="hidden xl:block relative left-0 top-0 p-4 z-9999 h-screen w-[250px] flex-col overflow-y-hidden bg-white rounded-r-3xl md:block">
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {/* bg-gradient-to-b from-gray-700 to-blue-500 */}
        {/* <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"></div> */}
        <div className="flex w-full justify-between items-center ">
          <a href="index.html">
            <img src="/logo.svg" alt="Logo" />
          </a>
          <i className="pi pi-times text-gray-400 cursor-pointer" />
        </div>
        <ul className="mt-5">
          <li className="pl-4 mb-2 rounded-lg cursor-pointer w-full py-2 text-left text-white bg-purple-600 ">
            <i className="pi text-md mr-[0.7rem] pi-address-book"></i>
            <span>Contacts</span>
          </li>
          <li className="pl-4 mb-2 rounded-lg cursor-pointer w-full py-2 text-left text-slate-400 hover:text-purple-500">
            <i className="pi text-md mr-[0.7rem] pi-heart"></i>
            <span>Favorite</span>
          </li>
          <li className="pl-4 mb-2 rounded-lg cursor-pointer w-full py-2 text-left text-slate-400 hover:text-purple-500">
            <i className="pi text-md mr-[0.7rem] pi-box"></i>
            <span>Archived</span>
          </li>
          <li className="pl-4 mb-2 rounded-lg cursor-pointer w-full py-2 text-left text-slate-400 hover:text-purple-500">
            <i className="pi text-md mr-[0.7rem] pi-trash"></i>
            <span>Deleted</span>
          </li>
          <li className="pl-4 mb-2 rounded-lg cursor-pointer w-full py-2 text-left text-slate-400 hover:text-purple-500">
            <i className="pi text-md mr-[0.7rem] pi-tag"></i>
            <span>Labels</span>
          </li>
          <li className="pl-4 mb-2 rounded-lg cursor-pointer w-full py-2 text-left text-slate-400 hover:text-purple-500">
            <i className="pi text-md mr-[0.7rem] pi-users"></i>
            <span>Groups</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
