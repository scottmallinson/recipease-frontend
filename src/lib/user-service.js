import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/user`,
      withCredentials: true
    });
  }

  async getUser(id) {
    const { data } = await this.user
      .get(`/profile/${id}`);
    return data;
  }

  async getSavedRecipes(id) {
    const { data } = await this.user
      .get(`/${id}`);
    return data;
  }

  async updatePantry(pantry) {
    const { data } = await this.user
      .put('/pantry', pantry);
    return data;
  }
}

const user = new UserService();

export default user;
