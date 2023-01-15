import http from "../http-common";

class PostDataService {
  getAllPosts() {
    return http.get("/posts");
  }

  getOnePost(postId) {
    return http.get(`/posts/${postId}`);
  }

  getUnreadPosts() {
    return http.get("/posts/unread");
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

  likePost(postId, userId) { // like === 1, 0?
    return http.post(`/posts/${postId}/like`, userId); // POST or DELETE
  }
}

export default new PostDataService()