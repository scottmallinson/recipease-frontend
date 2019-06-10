import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  async signup(user) {
    const { username, password } = user;
    const { data } = await this.auth
      .post("/auth/signup", { username, password });
    return data;
  }

  async login(user) {
    const { username, password } = user;
    const { data } = await this.auth
      .post("/auth/login", { username, password });
    return data;
  }

  async logout() {
    const response = await this.auth.post("/auth/logout", {});
    return response.data;
  }

  async me() {
    const response = await this.auth.get("/auth/me");
    return response.data;
  }
}

const auth = new Auth();

export default auth;
