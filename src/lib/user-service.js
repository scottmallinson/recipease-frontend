import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/user`,
      withCredentials: true
    });
  }

  getUser(id) {
    return this.user
      .get(`/profile/${id}`)
      .then(({ data }) => data)
  }

  getSavedRecipes(id) {
    return this.user
      .get(`/${id}`)
      .then(({ data }) => data)
  }

  updatePantry(pantry) {
    return this.user
      .put('/pantry', pantry)
      .then(({ data }) => data)
  }
}

const user = new UserService();

export default user;
