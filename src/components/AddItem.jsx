import React, { useState } from "react";
import { CopyIcon, Image, ImageUpIcon, PlusIcon, X, CheckCircle } from "lucide-react";

const AddItems = () => {
  const [FormData, setFormData] = useState({
    name: "",
    type: "Shirt",
    description: "",
    coverImage: "",
    AdditionalImage: [""],
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = [
    "Shirt",
    "Pant",
    "Shoes",
    "SportsGear",
    "Watches",
    "Accessories",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdditionalInputChage = (index, value) => {
    const newImgae = [...FormData.AdditionalImage];
    newImgae[index] = value;
    setFormData((prev) => ({
      ...prev,
      AdditionalImage: newImgae,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      AdditionalImage: [...prev.AdditionalImage, ""],
    }));
  };

  const removeImageField = (index) => {
    if (FormData.AdditionalImage.length > 1) {
      const newImages = FormData.AdditionalImage.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        AdditionalImage: newImages,
      }));
    }
  };

  const validateForm = () => {
    if (!FormData.name.trim()) {
      alert("Please enter item name");
      return false;
    }
    if (!FormData.description.trim()) {
      alert("Please enter item description");
      return false;
    }
    if (!FormData.coverImage.trim()) {
      alert("Please enter cover image URL");
      return false;
    }
    
    // Validate URL format
    try {
      new URL(FormData.coverImage);
    } catch {
      alert("Please enter a valid cover image URL");
      return false;
    }

    // Validate additional image URLs (only non-empty ones)
    const nonEmptyAdditionalImages = FormData.AdditionalImage.filter(img => img.trim() !== "");
    for (let img of nonEmptyAdditionalImages) {
      try {
        new URL(img);
      } catch {
        alert("Please enter valid URLs for additional images");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new item object
      const newItem = {
        id: Date.now(),
        name: FormData.name.trim(),
        type: FormData.type,
        description: FormData.description.trim(),
        coverImage: FormData.coverImage.trim(),
        additionalImages: [
          FormData.coverImage.trim(),
          ...FormData.AdditionalImage.filter(img => img.trim() !== "").map(img => img.trim())
        ]
      };

      console.log("New item created:", newItem);
      
      // You can also save to localStorage for persistence
      const existingItems = JSON.parse(localStorage.getItem('items') || '[]');
      const updatedItems = [...existingItems, newItem];
      localStorage.setItem('items', JSON.stringify(updatedItems));

      // Reset form
      setFormData({
        name: "",
        type: "Shirt",
        description: "",
        coverImage: "",
        AdditionalImage: [""],
      });

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg relative">
      {/* Success Message */}
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-10 animate-pulse">
          <CheckCircle className="w-5 h-5" />
          Item successfully added!
        </div>
      )}

      <h2 className="text-3xl font-bold text-slate-800 mb-6">Add New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Item Name*
          </label>
          <input
            type="text"
            name="name"
            value={FormData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter item name"
            className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Item Type*
          </label>
          <select
            name="type"
            value={FormData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          >
            {items.map((type, id) => (
              <option key={id} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Item Description*
          </label>
          <textarea
            name="description"
            value={FormData.description}
            onChange={handleInputChange}
            rows="4"
            required
            placeholder="Describe your item..."
            className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 resize-vertical"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cover Image URL*
          </label>
          <Image className="absolute w-5 h-5 text-slate-500 left-3 top-[42px]" />
          <input
            type="url"
            name="coverImage"
            value={FormData.coverImage}
            onChange={handleInputChange}
            required
            placeholder="https://example.com/image.jpg"
            className="w-full pl-10 px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Additional Images
          </label>

          {FormData.AdditionalImage.map((image, index) => (
            <div className="flex items-center gap-2 mb-3" key={index}>
              <div className="relative flex-1">
                <ImageUpIcon className="absolute w-5 h-5 text-slate-500 left-3 top-[14px]" />
                <input
                  type="url"
                  value={image}
                  onChange={(e) =>
                    handleAdditionalInputChage(index, e.target.value)
                  }
                  className="w-full pl-10 px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                  placeholder="https://example.com/additional-image.jpg"
                />
              </div>
              {FormData.AdditionalImage.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-all duration-200"
                  title="Remove this image"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 border border-blue-200 hover:border-blue-300"
          >
            <PlusIcon className="w-4 h-4" />
            Add Another Image
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Item...
              </div>
            ) : (
              'Add Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;