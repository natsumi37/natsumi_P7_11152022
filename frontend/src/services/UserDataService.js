import http from "../http-common"

class UserDataService {
  signup(data) {
    return http.post("/api/auth/signup", data)
  }

  login(data) {
    return http.post("/api/auth/login", data)
  }

  deleteUser(id) {
    return http.delete(`/api/auth/${id}`)
  }
}

export default new UserDataService()