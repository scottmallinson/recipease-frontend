import axios from "axios";

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: "http://localhost:5000/user",
      withCredentials: true
    });
  }

  getUser(id) {
    return this.user
      .get(`/profile/${id}`)
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
