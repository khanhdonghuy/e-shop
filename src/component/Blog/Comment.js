import { useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Comment(props) {
  const idCmt = props.idCmt;
  const idBlog = props.idBlog;
  const [inputComment, setInputComment] = useState("");
  const [errors, setErrors] = useState({});
  function handleComment(e) {
    const commentInput = e.target.value;
    setInputComment(commentInput);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    let checkLogin = localStorage.getItem("checkLogin");
    if (!checkLogin) {
      flag = false;
      errorSubmit.login = "Vui lòng đăng nhập";
    } else {
      if (inputComment === "") {
        flag = false;
        errorSubmit.comment = "Vui lòng nhập bình luận";
      }
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      const userData = JSON.parse(localStorage["checkInfo"]);
      let url = "/blog/comment/" + idBlog;
      let accessToken = userData.tokenUser;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("id_blog", idBlog);
      formData.append("id_user", userData.authUser.id);
      formData.append("id_comment", idCmt);
      formData.append("comment", inputComment);
      formData.append("image_user", userData.authUser.avatar);
      formData.append("name_user", userData.authUser.name);
      api.post(url, formData, config).then((res) => {
        console.log(res);
        const getCmt = props.getCmt(res.data.data);
        if (res.data.errors) {
          setErrors(res.data.errors);
        }
      });
    }
  }
  return (
    <div className="col-sm-12">
      <h2>Leave a replay</h2>
      <div className="text-area">
        <div className="blank-arrow">
          <label>Your Name</label>
        </div>
        <span>*</span>
        <textarea
          id="cmt"
          onChange={handleComment}
          name="message"
          rows={11}
          defaultValue={""}
        />
        <FormErrors errors={errors} />
        <button onClick={handleSubmit} className="btn btn-primary">
          post comment
        </button>
      </div>
    </div>
  );
}
export default Comment;
