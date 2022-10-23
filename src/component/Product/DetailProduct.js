import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../API/api';
let brand = {}
let category = {}
function DetailProduct(props) {
  let params = useParams();
  let idProduct = params.id;
  const [brandCategory,setBrandCategory] = useState('')
  const [dataProduct, setDataProduct] = useState("");
  
  function smallImage() {
    if (dataProduct !== '') {
      const dataImage = JSON.parse(dataProduct.image)
      return dataImage.map((value,key)=>{
        return (
          <a href key={key}><img id={value} className="choose" onClick={smallToMain} src={"http://localhost/laravel/laravel/public/upload/user/product/"+ dataProduct.id_user + "/small_" + value} alt="" /></a>
        )
      })
    }
  }

  function listBrand() {
    if (brandCategory !=='' && dataProduct !== '') {
      return brandCategory.brand.map((value,key)=>{
        brand[value.id] = value.brand
      })
    }
  }

  function listCategory() {
    if (brandCategory !=='') {
      return brandCategory.category.map((value,key)=>{
        category[value.id] =value.category
      })
    }
  }
  listBrand()
  listCategory()
  const [linkImage,setLinkImage]  = useState('') 
  function smallToMain(e) {
    let linkImg = e.target.id
    setLinkImage(linkImg)
  }
  useEffect(() => {
    api
      .get("/product/detail/" + idProduct)
      .then((res) => {
        console.log(res.data.data);
        setDataProduct(res.data.data);
        setLinkImage(JSON.parse(res.data.data.image.split(','))[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    api
      .get("/category-brand")
      .then((res) => {
        setBrandCategory(res.data);
        console.log(res.data);
      })
      .catch((error) => { 
        console.log(error);
      });
  }, []);

    return (
        <>
        <div className="col-sm-9 padding-right">
        <div className="col-md-12 padding-right">
          <div className="product-details">{/*product-details*/}
            <div className="col-sm-5">
              {/* <img src="http://localhost/laravel/laravel/public/upload/icon/new.png" className="newarrival" alt="" /> */}
              <div className="view-product">
                <img id="img_main" src={"http://localhost/laravel/laravel/public/upload/user/product/" + dataProduct.id_user +'/' + linkImage} alt="" />
                <a id="img_zoom" href={"http://localhost/laravel/laravel/public/upload/user/product/" + dataProduct.id_user +'/'+ linkImage} rel="prettyPhoto"><h3>ZOOM</h3></a>
              </div>
              <div id="similar-product" className="carousel slide" data-ride="carousel">
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="item active">
                    {smallImage()}
                  </div>
                  <div className="item">
                  {smallImage()}
                  </div>
                </div>
                {/* Controls */}
                <a className="left item-control" href="#similar-product" data-slide="prev">
                  <i className="fa fa-angle-left" />
                </a>
                <a className="right item-control" href="#similar-product" data-slide="next">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">{/*/product-information*/}
                <h2>{dataProduct.name}</h2>
                <p>WEB ID : </p>
                <span>Rating (0)  :</span>
                <form style={{display: 'inline-block'}} method="POST">
                  <input type="hidden" name="_token" defaultValue="lM7e2FdZVlsE05xv9bzsrY5WiYbvpoFU9GyPlz2G" />
                  <div className="rating">
                    <div className="star one">
                      <input type="hidden" defaultValue={1} />
                    </div>
                    <div className="star two">
                      <input type="hidden" defaultValue={2} />
                    </div>
                    <div className="star three">
                      <input type="hidden" defaultValue={3} />
                    </div>
                    <div className="star four">
                      <input type="hidden" defaultValue={4} />
                    </div>
                    <div className="star five">
                      <input type="hidden" defaultValue={5} />
                    </div>
                    <span className="value" style={{fontWeight: 'bold', color: 'orange'}} />
                    <input type="text" name="id_product" defaultValue={dataProduct.id} hidden />
                    <input type="text" name="id_user" defaultValue={dataProduct.id_user} hidden />
                  </div>
                </form>
                <p className="ajax-rated" />
                <span>
                  <span className="price">{dataProduct.price} $</span>
                  {/* <label>Quantity:</label>
						<input type="text" value="3" /> */}
                  <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </button>
                </span>
                <p><b>Availability:</b> In Stock</p>

                <p><b>Condition:</b></p>

                <p><b>Brand: </b>{brand[dataProduct.id_brand]}</p>

                <p><b>Rating: </b>  <img style={{width: '12px'}} src="http://localhost/laravel/laravel/public/upload/icon/star-rating.png" /></p>

              </div>{/*/product-information*/}
            </div>
          </div>{/*/product-details*/}
          <div className="category-tab shop-details-tab">{/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li><a href="#details" data-toggle="tab">Details</a></li>
                <li><a href="#company_profile" data-toggle="tab">Company Profile</a></li>
                <li><a href="#tag" data-toggle="tab">Tag</a></li>
                <li className="active"><a href="#reviews" data-toggle="tab">Reviews (0)</a></li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade in" id="details">
                {dataProduct.detail}
              </div>
              <div className="tab-pane fade in" id="company_profile">
              {dataProduct.company_profile}
              </div>
              <div className="tab-pane fade active in" id="reviews">
                <div className="col-sm-12">
                  <ul className="review_list">
                  </ul>
                </div>
                <div className="col-sm-12">
                  <ul>
                    <li><a><i className="fa fa-user" />DK</a></li>
                    <li><a><i className="fa fa-clock-o" />18:51</a></li>
                    <li><a><i className="fa fa-calendar-o" />30/08/2022</a></li>
                  </ul>					
                  <p className="auth_check" />
                  <p><b>Write Your Review</b></p>
                  <form id="form_review" method="POST">
                    <input type="hidden" name="_token" defaultValue="lM7e2FdZVlsE05xv9bzsrY5WiYbvpoFU9GyPlz2G" />							<div className="alert alert-info reply_user">
                      <button type="button" className="close_reply" data-dismiss="alert">×</button>
                    </div>
                    <textarea name="review" defaultValue={""} />
                    <input type="text" name="id_sub" id="id_sub" defaultValue hidden />
                    {/* <b>Rating: </b> <img src="images/product-details/rating.png" alt="" /> */}
                    <button type="submit" className="btn btn-default pull-right">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>{/*/category-tab*/}

        </div>
      </div>
        </>
    );
}

export default DetailProduct;