import http from "../http-common"

class UserDataService {
  signup(formData, config) {
    return http.post("/api/auth/signup", formData, config);
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