import { response } from "express";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS)
                            .collection('reviews');
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewsDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc);
        } catch(e) {
            console.error(`Unable to post review: ${e}`)
            return {error: e};
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            let query;
            query = { "_id": ObjectId(reviewId)};
             
            let updatedDoc = await reviews.updateOne(query, {
                $set: {"review": review, "date": date}
            })
            if (updatedDoc['modifiedCount'] === 1) {
                return updatedDoc;
            } else {
                console.log(`Unable to update review`);
                return {error: Error("Unable to update review")}
            }
        
        } catch(e) {
            console.error(`Unable to update review: ${e}`)
            return {error: e};
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            let query;
            query = { "_id": ObjectId(reviewId)};
            return await reviews.deleteOne(query);
        } catch(e) {
            console.error(`Unable to delete review: ${e}`)
            return {error: e};
        }
    }
}