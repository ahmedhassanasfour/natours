import axios from 'axios';
import { showAlert } from './alert';

export const createReview = async (tourId, rating, review) => {
  try {
    const res = await axios({
      method: 'post',
      url: `/api/v1/tours/${tourId}/reviews`,
      data: { rating, review },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Review added successfully ✅');
      window.setTimeout(() => location.reload(), 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
