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

  createPost(formData, config) {
    return http.post("/posts", formData, config);
  }

  modifyPost(postId, formData, config) {
    return http.put(`/posts/${postId}`, formData, config);
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