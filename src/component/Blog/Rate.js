import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Foo(props) {
  const idBlog = props.idBlog;
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [countVote, setCountVote] = useState();

  useEffect(() => {
    let listRate = [];
    let totalRate = 0;
    let averageRate = 0;
    api.get("/blog/rate/" + idBlog).then((res) => {
      console.log(res);
      if (res.data.data) {
        res.data.data.map((value) => {
          listRate.push(value.rate);
        });
        for (let i = 0; i < listRate.length; i++) {
          totalRate += listRate[i];
        }
        averageRate = totalRate / listRate.length;
        setRating(averageRate);
        setCountVote(listRate.length);
      }
    });
  }, []);

  function checkLogin(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    let checkLogin = localStorage.getItem("checkLogin");
    if (!checkLogin) {
      flag = false;
      errorSubmit.login = "Vui lòng đăng nhập";
    }
    if (!flag) {
      setErrors(errorSubmit);
    }
  }

  function changeRating(newRating, name) {
    setRating(newRating);
    const userData = JSON.parse(localStorage["checkInfo"]);
    let idUser = userData.authUser.id;
    let url = "/blog/rate/" + idBlog;
    let accessToken = userData.tokenUser;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("blog_id", idBlog);
    formData.append("user_id", idUser);
    formData.append("rate", newRating);
    api.post(url, formData, config).then((res) => {
      console.log(res);
    });
  }

  return (
    <>
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li onClick={checkLogin}>
            <StarRatings
              rating={rating}
              starRatedColor="#FE980F"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </li>
          <li className="color">({countVote} votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color" href>
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href>
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href>
              Girls
            </a>
          </li>
        </ul>
      </div>
      <FormErrors errors={errors} />
    </>
  );
}
export default Foo;
