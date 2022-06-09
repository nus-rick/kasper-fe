import axios from "axios";

const PersonAPI = {
  getAll: async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/persons');

      const { data } = response;

      if (data.status === 'success') {
        return data.data.persons;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  },

  add: async (payload: { name: string, position: number }) => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/persons', payload);
      const { data } = response;

      if (data.status === 'success') {
        return data.data.person;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  },

  update: async (id: number, payload: { name?: string, position?: number }) => {
    try {
      const response = await axios.patch(process.env.REACT_APP_API_URL + `/persons/${id}`, payload);
      const { data } = response;

      if (data.status === 'success') {
        return data.data.person;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id: Number) => {
    try {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/persons/${id}`);
      const { data } = response;

      if (data.status === 'success') {
        return data.data.isDeleted;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  },
}

export default PersonAPI;
