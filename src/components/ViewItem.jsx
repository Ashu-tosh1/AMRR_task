import React, { useState } from "react";
import { items } from "../lib/MockData";
import { ChevronLeft, ChevronRight, Package, Shirt, ShoppingBag, Volleyball, Watch, X } from "lucide-react";


const ViewItem = () => {

  const [showModal, setShowModal] = useState(true)
  const [selectedItem,setSelectedItem]=useState(1)
    const [Items, SetItems] = useState(items);
    const getItemIcon = (types) => {
        switch (types) {
            case 'Shirt': return <Shirt className="w-5 h-5" />
            case 'Shoes': return <ShoppingBag className="w-5 h-5" />
            case 'Sports': return <Volleyball className="w-5 h-5"/>
            case 'Watches': return <Watch className="w-5 h-5" />
            default : return <Package className="w-5 h-5"/>
            
        }

    }

    return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
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
                        <div className="absolute top-2 right-2 bg-white backdrop-blur-sm rounded-full p-2">
                      {getItemIcon(items.type)}
                        </div>
                        <div className="p-4">
                    <h3 className="font-semibold  text-lg text-slate-800 mb-1">{items.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {items.type}
                    </span>
                  </div>
                    </div> 
                
                
                </div>
               
                
             ) )} 
                </div>

        </div>
        
        {showModal && selectedItem && (
          
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-50" >
            <div className=" bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center rounded-2xl">
                <h3 className="text-xl font-semibold text-slate-800">{selectedItem.name} Name</h3>
                <button
                  // onClick={closeModal}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>

              </div>
           
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-50">
                      <img
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
                        alt="Image was there"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedItem && (
                      <>
                        <button
                          // onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                        >
                          <ChevronLeft className="w-5 h-5" />
                          

                        </button>
                        <button
                          // onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>

                    )}
                    {/* {selectedItem && (
                     <div className="flex justify-center mt-4 space-x-2">
                     {selectedItem.additionalImages.map((_, index) => (
                       <button
                         key={index}
                        //  onClick={() => setCurrentImageIndex(index)}
                         className={`w-2 h-2 rounded-full transition-all duration-200 ${
                           index === currentImageIndex ? 'bg-blue-600' : 'bg-slate-300'
                         }`}
                       />
                     ))}
                   </div>
                    ) } */}

                  </div>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {getItemIcon(selectedItem.type)}
                      <span className="ml-2">{selectedItem.type}</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Description</h4>
                    <p className="text-slate-600 leading-relaxed">{selectedItem.description}</p>
                  </div>
                </div>

              </div>
            </div>
            
          </div>

        )}
            </div>
    );  

}

export default ViewItem;