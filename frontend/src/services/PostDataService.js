import http from "../http-common";

class PostDataService {
  getAllPosts() {
    return http.get("/posts");
  }

  getOnePost(postId) {
    return http.get(`/posts/${postId}`);
  }

  getUnreadPosts(userId) {
    return http.get(`/posts/unread/${userId}`);
  }

  createPost(data) {
    return http.post("/posts", data);
  }

  modifyPost(postId, data) {
    return http.put(`/posts/${postId}`, data);
  }

  deletePost(postId) {
    return http.delete(`/posts/${postId}`);
  }

  readPost(postId, userId) {
    return http.post(`/posts/${postId}/read`, userId);
  }

  likePost(postId, userId) {
    return http.post(`/posts/${postId}/like`, userId);
  }
}

export default new PostDataService()