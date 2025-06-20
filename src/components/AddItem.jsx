import React, { useState } from "react";
import { CopyIcon, Image, ImageUpIcon, PlusIcon, X } from "lucide-react";

const AddItems = () => {
  const [FormData, setFormData] = useState({
    name: "",
    type: "Shirt",
    description: "",
    coverImage: "",
    AdditionalImage: [""],
  });

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

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Add New Item</h2>

      <div className="space-y-5">
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
            placeholder="Enter item to add"
            className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
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
            placeholder="Paste a cover image URL"
            className="w-full pl-10 px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Additional Images*
          </label>

          {FormData.AdditionalImage.map((image, index) => (
            <div className="relative mb-4" key={index}>
              <ImageUpIcon className="absolute w-5 h-5 text-slate-500 left-3 top-[14px]" />
              <input
                type="url"
                value={image}
                onChange={(e) =>
                  handleAdditionalInputChage(index, e.target.value)
                }
                className="w-full pl-10 px-4 py-3 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Add additional image URL"
              />
            </div>
          ))}

          <div className="flex gap-4 mt-2">
            <button
              type="button"
              onClick={() =>
                removeImageField(FormData.AdditionalImage.length - 1)
              }
              disabled={FormData.AdditionalImage.length <= 1}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition-all disabled:opacity-50"
            >
              <X className="w-4 h-4" /> Remove Last
            </button>

            <button
              type="button"
              onClick={addImageField}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 rounded-md transition-all"
            >
              <PlusIcon className="w-4 h-4" /> Add Another Image
            </button>
                  </div>
                  <div>
                      <button className="text-xl font-bold border px-2 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500  hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                          Submit
                      </button>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
