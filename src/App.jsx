import React from "react";
import ViewItem from "./components/ViewItem";
import AddItems from "./components/AddItem";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const app = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-500" >

      <nav className="flex items-center justify-center gap-4 font-bold text-2xl p-4">
          <button className="text-red-500 border-2 px-3 py-1 rounded-full" > 
          <Link to="/">Add Item</Link>
         </button>
         <button className="text-blue-500 border-2 px-3 py-1 rounded-full" > 
         <Link to="/Viewitem">ViewItem</Link>
         </button>
          
        </nav>
        <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/viewitem" element={<ViewItem />} />
        </Routes>
      </div>
      
    </BrowserRouter>
  );
};

export default app;
