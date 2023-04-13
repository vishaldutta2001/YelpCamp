const express=require('express')
const router=express.Router({mergeParams:true})//to access params

const Campground=require('../models/campground')
const Review=require('../models/review')

const catchAsync=require('../utils/catchAsync')

const{validateReview,isLoggedIn,isReviewAuthor}=require('../middleware')
const reviews=require('../controllers/reviews')

router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview))
//review deletes than that review reference in campground also has to be delete
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))
module.exports=router