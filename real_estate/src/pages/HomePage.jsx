import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay , Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../Components/ListingItem";

function HomePage() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentrListings, setRentListings] = useState([]);

  // Initialize Swiper with Navigation
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchofferlistings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=6`);
        const data = await res.json();
        console.log("data", data);

        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=Rent&limit=6`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=Sell&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchofferlistings();
  }, []);
  return (
    <div>
      {/* TOP SIDE */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
           Unlock doors to new <span className="text-slate-500"> Possibilities</span>
          <br /> with every property.
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Description of site. We have a wide range of properties for you to
          choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-500 hover:underline"
        >
          Let's get started
        </Link>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Navigation, Autoplay]} // Enable Autoplay module
        Autoplay
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // Time between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageURL[0]}) center no-repeat`,
                  backgroundSize: "cover",
                  height: "500px",
                }}
                key={listing._id}
              >
                {/* Additional content can go here */}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-9 ">
        {offerListings && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-semibold text-slate-700">
                {" "}
                Recent Offers{" "}
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more Offers
              </Link>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => {
                  return <ListingItem listings={listing} key={listing._id} />;
                })}
              </div>
            </div>
          </div>
        )}
        {rentrListings && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-semibold text-slate-700">
                {" "}
                Recent Places for Rent{" "}
              </h2>
              <Link
                to={`/search?type=Rent`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for rent.
              </Link>
              <div className="flex flex-wrap gap-4">
                {rentrListings.map((listing) => {
                  return <ListingItem listings={listing} key={listing._id} />;
                })}
              </div>
            </div>
          </div>
        )}
        {saleListings && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-semibold text-slate-700">
                {" "}
                Recent places for Sell {" "}
              </h2>
              <Link
                to={`/search?type=Sell`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sell
              </Link>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => {
                  return <ListingItem listings={listing} key={listing._id} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
