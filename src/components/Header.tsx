import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Header = () => {
  return (
    <div className="flex w-full bg-white h-16 rounded-lg p-4 items-center ">
      <div className="p-inputgroup w-[60%]">
        <Button
          icon="pi pi-bars border-transparent focus:border-transparent !outline-none focus:ring-0 "
          text
        />
        <Button
          icon="pi pi-search border-transparent focus:border-transparent text-purple-500 bold focus:ring-0"
          text
        />
        <InputText
          placeholder="Search contact..."
          className="border-none border-transparent focus:border-transparent focus:ring-0 pl-0"
        />
      </div>
      <div className=" w-[40%] text-right">Hello</div>
    </div>
  );
};

export default Header;
