import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListingItem({ listings }) {
  return (
    <Link
      to={`/listing/${listings._id}`}
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]"
    >
      <img
        src={listings.imageURL[0]}
        alt="Listing cover"
        className="h-[320px] sm:[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
      />
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-700">
          {listings.name}
        </p>
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-500 truncate w-full">
            {listings.address}
          </p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">
          {listings.description}
        </p>
        <p className="text-slate-500 font-semibold mt-2">
          $
          {listings.offer
            ? listings.discountPrice.toLocaleString("en-US")
            : listings.regularPrice.toLocaleString("en-US")}
          {listings.type === "Rent" && "/month"}
        </p>
        <div className="text-slate-700 flex gap-4">
          <div className="font-bold text-xs">
            {listings.bedroom > 1
              ? `${listings.bedroom} Beds`
              : `${listings.bedroom} Bed`}
          </div>
          <div className="font-bold text-xs">
            {listings.bathroom > 1
              ? `${listings.bathroom} Baths`
              : `${listings.bathroom} Bath`}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
