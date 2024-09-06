import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:5000/api/pizzas';

export const getPizzas = async () => {
  try {
    const response = await axios.get(URL_BASE);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPizza = async (id) => {
  try {
    const response = await axios.get(`${URL_BASE}/${id}`);
    console.log(`${URL_BASE}/${id}`)
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};