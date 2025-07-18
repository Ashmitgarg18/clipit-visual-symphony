// src/api/api.ts

import axios from 'axios';
import { API_URLS } from './Urls';

export const getTodo = async () => {
  try {
    const response = await axios.get(API_URLS.getTodo);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
};

// POST EXAMPSL
// export const postTodo = async (todoData: any) => {
//   try {
//     const response = await axios.post(API_URLS.createTodo, todoData);
//     return response.data;
//   } catch (error) {
//     console.error('Error posting todo:', error);
//     throw error;
//   }
// };