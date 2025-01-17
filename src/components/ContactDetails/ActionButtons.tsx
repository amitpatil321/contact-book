import { Button } from "primereact/button";
import { Contact } from "../../types/types";

const ActionButton: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div className="flex justify-start items-center gap-2 mt-auto text-gray-400 text-sm">
      <span className="hover:text-pink-700 cursor-pointer">Favorite</span>
      <span className="text-gray-400">|</span>
      <span className="hover:text-purple-500 cursor-pointer">Edit</span>
      <span className="text-gray-400">|</span>
      <span className="hover:text-purple-500 cursor-pointer">Archive</span>
      <span className="text-gray-400">|</span>
      <Button
        link
        className="px-1 text-gray-400 hover:text-red-500 cursor-pointer"
        onClick={() => console.log(contact.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionButton;
