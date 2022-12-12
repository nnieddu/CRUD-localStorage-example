// import axios from "axios";

/// -----------------------------------------------
import database from "./dbLocal.json";
var posts = localStorage.getItem("posts");
if (posts === null)
  localStorage.setItem("posts", JSON.stringify(database.posts.reverse()));
posts = JSON.parse(localStorage.getItem("posts"));
/// -----------------------------------------------

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_LIKE = "ADD_LIKE";

export const getPosts = () => {
  /// -----------------------------------------------
  return async (dispatch) => {
    try {
      dispatch({ type: GET_POSTS, payload: posts });
    } catch (err) {
      return console.log(err);
    }
  };
  /// -----------------------------------------------
  // return async (dispatch) => {
  //   try {
  // 		const res = await axios
  // 			.get(`http://localhost:3003/posts?_sort=id&_order=desc`);
  // 		dispatch({ type: GET_POSTS, payload: res.data });
  // 	} catch (err) {
  // 		return console.log(err);
  // 	}
  // };
};

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      /// -----------------------------------------------
      data.id = posts.length; ///
      posts.unshift(data); ///
      localStorage.setItem("posts", JSON.stringify(posts)); ///
      /// -----------------------------------------------
      // await axios.post(`http://localhost:3003/posts`, data);
      dispatch({ type: ADD_POST, payload: data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const editPost = (data) => {
  return async (dispatch) => {
    try {
      /// -----------------------------------------------
      posts.find((o, i) => {
        if (o.id === data.id) {
          posts[i].title = data.title;
          posts[i].content = data.content;
          return true; // stop searching
        }
        return false; // if edited post don't exist, normally impossible
        // but find expect a return so return false to avoid warning;
      });
      localStorage.setItem("posts", JSON.stringify(posts));
      /// -----------------------------------------------
      // await axios({
      //   method: "put",
      //   url: `http://localhost:3003/posts/${data.id}`,
      //   data: { ...data },
      // });
      dispatch({ type: EDIT_POST, payload: { ...data } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      // await axios({
      //   method: "delete",
      //   url: `http://localhost:3003/posts/${postId}`,
      // });
			// dispatch({ type: DELETE_POST, payload: { postId } });
      /// -----------------------------------------------
      posts.find((o, i) => {
				if (o.id === postId) {
					posts.splice(i, 1);
					dispatch({ type: DELETE_POST, payload: { postId } });
          return true; // stop searching
        }
        return false; // if edited post don't exist, normally impossible
        // but find expect a return so return false to avoid warning;
      });
      localStorage.setItem("posts", JSON.stringify(posts));
      /// -----------------------------------------------
    } catch (err) {
      return console.log(err);
    }
  };
};

export const addLike = (data) => {
  return async (dispatch) => {
    try {
      /// -----------------------------------------------
			console.log(data);
      posts.find((o, i) => {
        if (o.id === data.id) {
          posts[i].likes = data.likes;
          return true; // stop searching
        }
        return false; // if edited post don't exist, normally impossible
        // but find expect a return so return false to avoid warning;
      });
      localStorage.setItem("posts", JSON.stringify(posts));
      /// -----------------------------------------------			
      // await axios({
      //   method: "put",
      //   url: `http://localhost:3003/posts/${data.id}`,
      //   data: { ...data },
      // });
      dispatch({ type: ADD_LIKE, payload: { ...data } });
    } catch (err) {
      return console.log(err);
    }
  };
};
