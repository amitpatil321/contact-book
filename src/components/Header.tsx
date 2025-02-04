import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useRef } from "react";
import useStore from "../store/store";

const Header: React.FC = () => {
  // const { setShowAddContact } = useContext(AppContext) as AppContextType;
  const { setShowAddContact, setSidebarState } = useStore();
  const sidebarExpanded = useStore((state) => state.sidebarExpanded);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center bg-white p-4 rounded-lg w-full h-16">
      <div className="p-inputgroup w-[60%]">
        <Button
          icon="pi pi-bars"
          text
          onClick={() => setSidebarState(!sidebarExpanded)}
          aria-label="Open navigation menu"
          className="border-transparent focus:border-transparent focus:ring-0 !outline-none"
        />
        <Button
          icon="pi pi-search"
          text
          aria-label="search contact"
          className="bg-transparent border-transparent focus:border-transparent focus:ring-0 text-purple-600 cursor-default !outline-none bold"
          onClick={() => inputRef?.current?.focus()}
        />
        <label htmlFor="search-contact" className="sr-only">
          Search contact
        </label>
        <InputText
          ref={inputRef}
          placeholder="Search contact..."
          className="pl-0 border-transparent focus:border-transparent border-none focus:ring-0"
        />
      </div>
      <div className="text-right w-[40%]">
        <Button
          icon="pi pi-plus"
          label="Add Contact"
          className="text-purple-600"
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
