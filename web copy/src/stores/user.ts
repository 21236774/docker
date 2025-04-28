import { defineStore } from "pinia";
import axios from "axios";

interface UserState {
  token: string | null;
  username: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  }),

  actions: {
    async login(credentials: { username: string; password: string }) {
      const formData = new FormData();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);

      const response = await axios.post(
        "http://localhost:26001/token",
        formData
      );
      this.token = response.data.access_token;
      this.username = credentials.username;

      localStorage.setItem("token", this.token);
      localStorage.setItem("username", this.username);

      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    },

    async register(userData: {
      username: string;
      email: string;
      password: string;
    }) {
      await axios.post(
        "http://localhost:26001/register",
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },

    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
