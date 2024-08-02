import Sidebar from "./Sidebar";
import Navbar from "./Navbar"
import { useSelector } from "react-redux";
import { AppState } from "../../actions/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../UserList/UserList";
const HomePage = () => {
  const navigate = useNavigate();


  const { isAuthenticated } = useSelector((state: AppState) => state.auth);


  

  useEffect(() => {
    if(isAuthenticated === false) {
      navigate('/login');
    }
  })
  return (
    <div className="h-screen grid font-roboto grid-cols-[100px_1fr_200px] grid-rows-[auto_1fr] gap-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
      <div className=" dark:bg-gray-800 col-span-1 row-span-3  z-50">
        <Sidebar />
      </div>

      <div className=" dark:bg-gray-100 col-span-2 row-span-1 p-4 py-8">
      <Navbar />
      </div>
      <div className="bg-neutral-200 dark:bg-gray-800 col-span-1 row-span-2 p-4">
        <UserList/>
      </div>
      <div className="bg-neutral-200 dark:bg-gray-800 col-span-1 row-span-2 p-4">
        rightbar
      </div>
    </div>
  );
};
export default HomePage;