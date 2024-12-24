import express from "express";
import * as ReviewController from "../controllers/review.controller";

const router = express.Router();

/**
 * post - http://localhost:8096/POST/reviews
 */

router.post('/POST/reviews', ReviewController.postreviews);


/**
 * get All customer - http://localhost:8096/GET/reviews
 */
router.get('/GET/reviews', ReviewController.getreviews);

/**
 * Update - http://localhost:8096/PUT/reviews/:id
 */
router.put('/PUT/reviews', ReviewController.updatereviews);

/**
 * Delect - http://localhost:8096/DELETE/reviews/:id
 */
router.delete('/DELETE/reviews/:id', ReviewController.deletereviews);

 

export default router;