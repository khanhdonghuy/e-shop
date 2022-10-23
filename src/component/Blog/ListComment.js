function ListComment(props) {
  const comments = props.comments;

  function handleClickReply(e) {
    let idCmt = e.target.id;
    const getIdCmt = props.getIdCmt(idCmt);
  }

  if (comments) {
    if (comments.length > 0) {
      return comments.map((value) => {
        if (value.id_comment === 0) {
          return (
            <>
              <li key={value.id} className="media">
                <a className="pull-left" href>
                  <img
                    className="media-object"
                    style={{ width: "30px", height: "30px" }}
                    src={
                      "http://localhost/laravel/laravel/public/upload/user/avatar/" +
                      value.image_user
                    }
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {value.name_user}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{value.comment}</p>
                  <a
                    className="btn btn-primary"
                    href
                    id={value.id}
                    onClick={handleClickReply}
                  >
                    <i className="fa fa-reply" />
                    Replay
                  </a>
                </div>
              </li>
              {comments.map((value1) => {
                if ( value.id === value1.id_comment) {
                  return (
                    <li key={value1.id} className="media second-media">
                      <a className="pull-left" href>
                        <img
                          className="media-object"
                          style={{ width: "30px", height: "30px" }}
                          src={
                            "http://localhost/laravel/laravel/public/upload/user/avatar/" +
                            value1.image_user
                          }
                          alt=""
                        />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li>
                            <i className="fa fa-user" />
                            {value1.name_user}
                          </li>
                          <li>
                            <i className="fa fa-clock-o" /> 1:33 pm
                          </li>
                          <li>
                            <i className="fa fa-calendar" /> DEC 5, 2013
                          </li>
                        </ul>
                        <p>{value1.comment}</p>
                        {/* <a className="btn btn-primary" href>
              <i className="fa fa-reply" />
              Replay
            </a> */}
                      </div>
                    </li>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  }
}

export default ListComment;

