import Listing from "../models/listing.modal.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        console.log("reach");

        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deletelisting = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing Not Found"));
    }

    if (req.user.id != listing.useRef) {
        return next(errorHandler(401, "You can Only delete your own listings"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been Deleted")
    } catch (error) {
        next(error)
    }

}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing not Found"));
    }
    if (req.user.id !== listing.useRef) {
        return next(errorHandler(401, "You can Only delete your own listings"));
    }


    try {
        const updateListing = await Listing.findByIdAndUpdate(req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            _id: req.params.id,
        })

    } catch (error) {
        next(error.message);
    }

}
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not Found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }

}

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit,10) || 9;
        const startIndex = parseInt(req.query.startIndex,10) || 0;
        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] }
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] }
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] }
        }

        let type = req.query.type;
        if (type === undefined || type === "all") {
            type = { $in: ['Sell', 'Rent'] }
        }

        const searchTerm = req.query.searchTerm || "";

        const sort = req.query.sort || 'CreatedAt';

        const order = req.query.order || "desc";
            
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,type,parking
        }).sort({
            [sort]: order
        }).limit(limit).skip(startIndex);

        return res.status(200).json(listings);


    } catch (error) {
        next(error)
    }
}