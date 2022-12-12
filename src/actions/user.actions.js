// import axios from "axios";
/// -----------------------------------------------
import database from "./dbLocal.json";
var users = localStorage.getItem("users");
if (users === null)
  localStorage.setItem("users", JSON.stringify(database.users));
users = JSON.parse(localStorage.getItem("users"));
/// -----------------------------------------------

export const GET_USER = "GET_USER";
export const ADD_USER_LIKE = "ADD_USER_LIKE";
export const REMOVE_USER_LIKE = "REMOVE_USER_LIKE";

export const getUser = () => {
  /// -----------------------------------------------
  return async (dispatch) => {
    try {
      dispatch({ type: GET_USER, payload: users });
    } catch (err) {
      return console.log(err);
    }
  };
  /// -----------------------------------------------
  // return async (dispatch) => {
  //   try {
  // 		const res = await axios
  // 			.get(`http://localhost:3003/users`);
  // 		dispatch({ type: GET_USER, payload: res.data });
  // 	} catch (err) {
  // 		return console.log(err);
  // 	}
  // };
};

export const addUserLike = (data) => {
  return async (dispatch) => {
    try {
      /// -----------------------------------------------
      users.find((o, i) => {
        if (o.id === data.id) {
          users[i].likes = data.likes;
          return true;
        }
        return false;
      });
      localStorage.setItem("users", JSON.stringify(users));
      /// -----------------------------------------------
      // await axios({
      //   method: "put",
      //   url: `http://localhost:3003/users/${data.id}`,
      //   data: { ...data },
      // });
      dispatch({ type: ADD_USER_LIKE, payload: { ...data } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const removeUserLike = (post) => {
  return async (dispatch) => {
		var newLikeValue = 0; ///
    try {
      /// -----------------------------------------------
      users.find((o, i) => {
        if (o.id === post.authorID) {
          users[i].likes -= post.likes;
					newLikeValue = users[i].likes;
          return true;
        }
        return false;
      });
      localStorage.setItem("users", JSON.stringify(users));
      /// -----------------------------------------------
      // await axios({
      //   method: "put",
      //   url: `http://localhost:3003/users/${data.id}`,
      //   data: { ...data },
      // });
      dispatch({ type: REMOVE_USER_LIKE, payload: post, newLikeValue: newLikeValue});
    } catch (err) {
      return console.log(err);
    }
  };
};
