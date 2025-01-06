import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface HeaderProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ expanded, setExpanded }) => {
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
      <div className="text-right w-[40%]">Hello</div>
    </div>
  );
};

export default Header;
