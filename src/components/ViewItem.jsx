import React, { useState } from "react";
import { items } from "../lib/MockData";
import { ChevronLeft, ChevronRight, Mail, Package, Shirt, ShoppingBag, Volleyball, Watch, X } from "lucide-react";

const ViewItem = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [Items, SetItems] = useState(items);

  const getItemIcon = (types) => {
    switch (types) {
      case 'Shirt': return <Shirt className="w-5 h-5" />
      case 'Shoes': return <ShoppingBag className="w-5 h-5" />
      case 'Sports': return <Volleyball className="w-5 h-5" />
      case 'Watches': return <Watch className="w-5 h-5" />
      default: return <Package className="w-5 h-5" />
    }
  }

  const openModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem && selectedItem.additionalImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedItem.additionalImages.length
      );
    }
  };

  const prevImage = () => {
    if (selectedItem && selectedItem.additionalImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.additionalImages.length - 1 : prev - 1
      );
    }
  };

  const handleEnquiry = () => {
    if (selectedItem) {
      alert(`Enquiry email sent for ${selectedItem.name}! We'll get back to you soon.`);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Your Items</h2>
        <div className="flex items-center text-slate-600">
          <Package className="w-5 h-5 mr-2" />
          <span>{Items.length} items</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Items.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(item)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-slate-100"
          >
            <div className="relative overflow-hidden">
              <img 
                src={item.coverImage} 
                alt={item.name} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2">
                {getItemIcon(item.type)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-slate-800 mb-1">{item.name}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-semibold text-slate-800">{selectedItem.name}</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Section */}
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-50">
                    <img
                      src={selectedItem.additionalImages && selectedItem.additionalImages.length > 0 
                        ? selectedItem.additionalImages[currentImageIndex] 
                        : selectedItem.coverImage}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Navigation arrows - only show if there are additional images */}
                  {selectedItem.additionalImages && selectedItem.additionalImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image indicators */}
                  {selectedItem.additionalImages && selectedItem.additionalImages.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {selectedItem.additionalImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Item Details Section */}
                <div className="space-y-4">
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
                  
                  <button
                    onClick={handleEnquiry}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Enquire</span>
                  </button>
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