import axios from 'axios';
import { showAlert } from './alert.js';

export const updateSettings = async (data, type) => {
  const url =
    type === 'password'
      ? '/api/v1/users/updateMyPassword'
      : '/api/v1/users/updateMe';

  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const updatePassword = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updatePassword',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
