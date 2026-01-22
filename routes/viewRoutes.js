const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const BookingController = require('../controllers/bookingController');

router.get(
  '/',
  BookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview,
);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/me', authController.protect, authController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);
// router.post('/submit-user-data', viewController.updateUserData);

module.exports = router;
