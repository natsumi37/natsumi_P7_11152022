import http from "../http-common"

class UserDataService {
  signup(data) {
    return http.post("/api/auth/signup", data);
  }

  login(data) {
    return http.post("/api/auth/login", data);
  }

  deleteUser(userId) {
    return http.delete(`/api/auth/delete/${userId}`);
  }

  getAllUsers() {
    return http.get("/api/auth/users");
  }
}

export default new UserDataService()