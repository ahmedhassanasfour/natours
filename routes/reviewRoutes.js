const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const BookingController = require('../controllers/bookingController');

router.use(authController.protect);

router.get('/', reviewController.getAllReviews);
router.post(
  '/',
  authController.restrictTo('user'),
  BookingController.checkIfBookedTour,
  reviewController.setTourUserIds,
  reviewController.createReview,
);

router.delete(
  '/:id',
  authController.restrictTo('user', 'admin'),
  reviewController.deleteReview,
);
router.patch(
  '/:id',
  authController.restrictTo('user', 'admin'),
  reviewController.updateReview,
);
router.get('/:id', reviewController.getReviewById);

module.exports = router;
