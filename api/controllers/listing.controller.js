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
        // Parse query parameters with default values
        const limit = parseInt(req.query.limit, 10) || 9;
        const startIndex = parseInt(req.query.startIndex, 10) || 0;

        // Process optional filters
        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        } else if (offer === "true") {
            offer = true;
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] };
        } else if (furnished === "true") {
            furnished = true;
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] };
        } else if (parking === "true") {
            parking = true;
        }

        let type = req.query.type;
        if (type === undefined || type === "all") {
            type = { $in: ['Sell', 'Rent'] };
        }

        // Other query parameters
        const searchTerm = req.query.searchTerm || "";

        // Sorting options
        const sort = req.query.sort || 'CreatedAt';
        const order = req.query.order === 'asc' ? 1 : -1; // Ensure order is -1 for descending or 1 for ascending

        // Build the query
        const query = {
            name: { $regex: searchTerm, $options: 'i' }
        };

        if (offer !== undefined) query.offer = offer;
        if (furnished !== undefined) query.furnished = furnished;
        if (parking !== undefined) query.parking = parking;
        if (type !== undefined) query.type = type;

        // Log the query for debugging
        console.log("Constructed Query:", JSON.stringify(query, null, 2));
        console.log("Sort Field:", sort);
        console.log("Sort Order:", order);
        console.log("Limit:", limit);
        console.log("Start Index:", startIndex);

        // Perform the query
        const listings = await Listing.find(query)
            .sort({ [sort]: order }) // Sort by the specified field and order
            .limit(limit)           // Limit the number of results
            .skip(startIndex);      // Skip the number of results for pagination

        // Log results for debugging
        console.log("Listings Returned:", listings);

        // Return the results as JSON
        return res.status(200).json(listings);

    } catch (error) {
        // Pass errors to the next middleware for handling
        console.error("Error fetching listings:", error);
        next(error);
    }
};
