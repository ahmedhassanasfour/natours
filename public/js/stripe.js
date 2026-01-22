import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51SrOClFZhg0Bjz4gBxxo3v3FgL6TE4hHuTQJwdmx59bC7JkHJ8MoW0l9DD4ppFSkeOOl7bNlUi7goBag6GuMXVy900CvvdpHI2',
);

export const bookTour = async (tourid) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourid}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
