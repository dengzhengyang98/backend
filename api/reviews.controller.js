import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );

            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to post review."});
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
        
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const userId = req.body.user_id;
            const name = req.body.name;

            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                review,
                date
            );

            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({error: "unable to put review."});
            } else {
                res.json({ status: "success" });
            } 
        } catch (e) {
            res.status(500).json({ error: e.message});
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId
            );

            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({error: "unable to delete review."});
            } else {
                res.json({ status: "success" });
            } 
        } catch (e) {
            res.status(500).json({ error: e.message});
        }
    }
}
