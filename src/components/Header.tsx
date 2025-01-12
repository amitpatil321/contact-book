import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../types/types";

const Header: React.FC = () => {
  const { expanded, setExpanded, setShowAddContact } = useContext(
    AppContext
  ) as AppContextType;

  return (
    <div className="flex items-center bg-white p-4 rounded-lg w-full h-16">
      <div className="w-[60%] p-inputgroup">
        <Button
          icon="pi pi-bars border-transparent focus:border-transparent !outline-none focus:ring-0 "
          text
          onClick={() => setExpanded(!expanded)}
        />
        <Button
          icon="pi pi-search border-transparent focus:border-transparent text-purple-500 bold focus:ring-0"
          text
        />
        <InputText
          placeholder="Search contact..."
          className="pl-0 border-transparent focus:border-transparent border-none focus:ring-0"
        />
      </div>
      <div className="text-right w-[40%]">
        <Button
          icon="pi pi-plus"
          label="Add Contact"
          aria-label="Add contact"
          severity="help"
          size="small"
          text
          onClick={() => setShowAddContact(true)}
        />
      </div>
    </div>
  );
};

export default Header;
