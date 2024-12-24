import express, { Request, Response } from "express";
import CustomResponse from "../dtos/custom.response";
import ReviewModel from "../models/review.model";

// Save a Review
export const postreviews = async (req: Request, res: Response) => {
    try {
        let req_body = req.body;

        const review = new ReviewModel({
            title: req_body.title,
            author: req_body.author,
            rating: req_body.rating,
            reviewText: req_body.reviewText,
            dateAdded: req_body.dateAdded,
        });

        await review.save()
            .then(() => {
                res.status(200).send(new CustomResponse(200, "Review created successfully."));
            })
            .catch((e: any) => {
                console.log(e);
                res.status(500).send(new CustomResponse(100, "Something went wrong."));
            });

    } catch (error) {
        res.status(500).send("Error");
    }
};

// Get All Reviews
export const getreviews = async (req: Request, res: Response) => {
    try {
        let reviews = await ReviewModel.find();
        console.log('Review data:', reviews);

        res.status(200).send(
            new CustomResponse(200, "Reviews found successfully", reviews)
        );

    } catch (error) {
        res.status(500).send("Error");
    }
};

// Update Review
export const updatereviews = async (req: Request, res: Response) => {
    try {
        let req_body: any = req.body;

        let review = await ReviewModel.findById(req_body.id);

        if (review) {
            await ReviewModel.findOneAndUpdate({ _id: req_body.id }, {
                title: req_body.title,
                author: req_body.author,
                rating: req_body.rating,
                reviewText: req_body.reviewText,
                dateAdded: req_body.dateAdded,
            })
                .then(() => {
                    res.status(200).send(new CustomResponse(200, "Review updated successfully."));
                })
                .catch((error: any) => {
                    console.log(error);
                    res.status(500).send(new CustomResponse(100, "Something went wrong."));
                });
        } else {
            res.status(401).send(new CustomResponse(401, "Access denied"));
        }
    } catch (error) {
        res.status(500).send("Error");
    }
};

// Delete Review
export const deletereviews = async (req: Request, res: Response) => {
    try {
        let reviewId: string = req.params.id;

        let review = await ReviewModel.findById(reviewId);

        if (review) {
            await ReviewModel.deleteOne({ _id: reviewId })
                .then(() => {
                    res.status(200).send(new CustomResponse(200, "Review deleted successfully."));
                })
                .catch((e: any) => {
                    res.status(500).send(new CustomResponse(100, "Something went wrong."));
                });
        } else {
            res.status(401).send(new CustomResponse(401, "Access denied"));
        }
    } catch (error) {
        res.status(500).send("Error");
    }
};
