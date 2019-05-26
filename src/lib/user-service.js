import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: "http://localhost:5000/user",
      withCredentials: true
    });
  }

  usersRecipes(id) {
    return this.user
      .put(`/profile/${id}`)
      .then(({ data }) => data)
  }

  updatePantry(pantry) {
    return this.user
      .put('http://localhost:5000/user/pantry', pantry)
      .then(({ data }) => data)
  }
}

const user = new UserService();

export default user;
