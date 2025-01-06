import "./App.css";
import Header from "./components/Header";
import ListContacts from "./components/ListContacts";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex bg-gray-100 border h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 p-4 h-full overflow-x-hidden overflow-y-auto">
        <Header />
        <ListContacts />
      </div>
    </div>
  );
}

export default App;
