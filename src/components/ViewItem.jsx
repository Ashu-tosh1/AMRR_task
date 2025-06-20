import React, { useState } from "react";
import { items } from "../lib/MockData";
import { Package } from "lucide-react";


const ViewItem = () => {

    const [Items, SetItems] = useState(items);

    return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Your Items</h2>
              <div className="flex items-center text-slate-600">
                <Package className="w-5 h-5 mr-2" />
                <span>{items.length} items</span>
              </div>
            </div>


            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >

            {Items.map((items) => (
                <div
                    key={items.id}
                    // onClick={() }
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-slate-100"
                >
                    <div className=" relative overflow-hidden" >
                        <img src={items.coverImage} alt="item.name" 
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div> 
                
                
                </div>
               
                
             ) )} 
                </div>

            </div>
            </div>
    );  

}

export default ViewItem;