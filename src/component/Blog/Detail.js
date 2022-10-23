import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../API/api";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Foo from "./Rate";

function Detail(props) {
  let params = useParams();
  let idBlog = params.id;
  const [data, setData] = useState("");
  const [comments, setComments] = useState();
  const [idCmt, setIdCmt] = useState('')

  function getIdCmt(id) {
    setIdCmt(id)
  };

  function getCmt(data) {
    const dataCmt = comments.concat(data)
    setComments(dataCmt)
  }
 
  useEffect(() => {
    api
      .get("/blog/detail/" + idBlog)
      .then((res) => {
        setData(res.data.data);
        setComments(res.data.data.comment);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        <div className="single-blog-post">
          <h3>{data.title}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" /> 1:33 pm
              </li>
              <li>
                <i className="fa fa-calendar" /> DEC 5, 2013
              </li>
            </ul>
          </div>
          <a href>
            <img
              src={
                "http://localhost/laravel/laravel/public/upload/Blog/image/" + data.image
              }
              alt=""
            />
          </a>
          <p>{data.content}</p>
          <div className="pager-area">
            <ul className="pager pull-right">
              <li>
                <Link to="#">Pre</Link>
              </li>
              <li>
                <Link to="#">Next</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*/blog-post-area*/}
            <Foo idBlog={idBlog}/>
      {/*/rating-area*/}
      <div className="socials-share">
        <a href>
          <img src="images/blog/socials.png" alt="" />
        </a>
      </div>

      <div className="response-area">
        <h2>RESPONSES</h2>
        <ul className="media-list">
        
          <ListComment comments={comments} getIdCmt={getIdCmt} />
        </ul>
      </div>
      {/*/Response-area*/}
      <div className="replay-box">
        <div className="row">
          <Comment idBlog={idBlog} getCmt={getCmt} idCmt={idCmt}/>
        </div>
      </div>
      {/*/Repaly Box*/}
    </div>
  );
}
export default Detail;
