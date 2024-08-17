import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import { SwiperCore } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../Components/Contact";

function ListingPage() {
  const {listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const[contact,setContact]=useState(false);
  const [copied, setCopied] = useState(false);
  const {currentUser}=useSelector((state)=>state.user);

  // console.log(listing.useRef);
  
  useEffect(() => {
    console.log(listingId);

    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">LOADING.....</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went Wrong</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageURL.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed top-[13%] right-[3%] z-10 border rounded-full 
                w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
          >
            <FaShare
              className=" text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name}-${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "Rent" && "/ month "}
            </p>

            <p className="flex items-center mt-6 gap-2 text-slate-600   text-sm">
              <FaMapMarkedAlt className="text-green-500" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p
                className="bg-red-900 w-full max-w-[200px] text-white
              text-center p-1 rounded-md"
              >
                {listing.type === "Rent" ? "For Rent" : "For Sell"}
              </p>
              {listing.offer && (
                <p
                  className="bg-green-900 w-full max-w-[200px] text-white
              text-center p-1 rounded-md"
                >
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="flex flex-wrap text-green-500 font-semibold text-sm items-center gap-4 sm:gap-6">
              <li className="flex item-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedroom > 1
                  ? `${listing.bedroom} Beds`
                  : `${listing.bedroom} Bed`}
              </li>
              <li className="flex item-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathroom > 1
                  ? `${listing.bathroom} Bathrooms`
                  : `${listing.bathroom} Bathroom`}
              </li>
              <li className="flex item-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Paking spot" : "No parking"}
              </li>
              <li className="flex item-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {
              currentUser && listing.useRef !==currentUser._id && !contact &&(
                <button onClick={()=>setContact(true)} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">Contact Landlord</button>
              )
            }
            {
              contact && <Contact listing={listing}/>
            }
          </div>
        </div>
      )}
    </main>
  );
}

export default ListingPage;
