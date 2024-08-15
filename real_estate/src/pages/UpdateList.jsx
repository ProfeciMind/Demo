import React, { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate , useParams} from "react-router-dom";

function UpdateList() {
  // const ref=useRef(null);
  const [files, setfiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURL: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedroom: 1,
    bathroom: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate=useNavigate();
  const params=useParams();

  useEffect(()=>{
    const fetchListing= async ()=>{
        const listingId=params.listingId;
        console.log("Listing",listingId);
        
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success===false){
           console.log(data.message);
           return;
        }
        setFormData(data)
    }
    fetchListing();
  },[])

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageURL.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURL: formData.imageURL.concat(urls),
          });
          setUploading(false);
          setImageUploadError(false);
        })
        .catch((err) => {
          setImageUploadError("image Upload Failed(2mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload only 6 Image");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, fileName);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("reach2");
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        //skipped checked progress
        (error) => {
          Selection(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageURL: formData.imageURL.filter((_, i) => {
        i !== index;        
      }),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.imageURL.length<1) return setError("You Must Upload at least one image");
      if(+formData.regularPrice < +formData.discountPrice) return setError("Discounted Price must be lower than regular price");
      setLoading(true);
      setError(false);
      console.log("Update:",params.listingId);
      
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,      
          useRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log("data",data);
      
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`) ;
    } catch (error) {
      setError(error.message);
      setLoading(true);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Your Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* Main Form Fields */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-3 border rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input 
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg"
            id="description"
            maxLength="62"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sale</span>
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                checked={formData.bedroom}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathroom"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                checked={formData.bathroom}
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                checked={formData.regularPrice}
              />
              <div className="flex flex-col items-center gap-2">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer.offer && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                checked={formData.discountPrice}
              />
              <div className="flex flex-col items-center gap-2">
                <p>Discounted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            )
            }
          </div>
        </div>

        {/* Image Section */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images:</p>
          <span className="font-normal text-gray-700 ml-2">
            The first image will be the cover (max 6)
          </span>
          <div className="flex gap-4">
            <input
              className="p-3 border-gray-300 w-full rounded"
              onChange={(e) => setfiles(e.target.files)}
              type="file"
              id="image"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-85"
            >
              {uploading ? "Uploading...." : "Upload"}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageURL.length > 0 &&
            formData.imageURL.map((urls, index) => (
              <div
                key={urls}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={urls}
                  alt="Listing Image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  DELETE
                </button>
              </div>
            ))}
          <button type="submit" disabled={loading || uploading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Updating..." : "Update Listing "}
          </button>
          {error && <p className="text-red-800 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default UpdateList;
