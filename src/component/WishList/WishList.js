import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../API/api";
import { UserContext } from "../Layout/UserContext";

function WishList(props) {
  let order = {};
  let wishList = {};
  let amountCartHeader = 0;
  let amountWishListHeader = 0;
  const user = useContext(UserContext);
  const [dataProduct, setDataProduct] = useState("");
  const [countCart, setCountCart] = useState("");
  const [countWishList, setCountWishList] = useState("");

  function showAmountCart() {
    let infoCart = localStorage.getItem("infoCart");
    if (infoCart) {
      if (amountCartHeader == 0) {
        order = JSON.parse(infoCart);
        Object.keys(order).map((key) => {
          return (amountCartHeader += order[key]);
        });
      }
    }
  }
  showAmountCart();
  user.showAmountCart(countCart);
  function showAmountWishList() {
    let infoWishList = localStorage.getItem("infoWishList");
    if (infoWishList) {
      if (amountWishListHeader == 0) {
        wishList = JSON.parse(infoWishList);
        Object.keys(wishList).map((key) => {
          return (amountWishListHeader += wishList[key]);
        });
      }
    }
  }
  showAmountWishList();
  user.showAmountWishList(countWishList);

  function addProduct(e) {
    if (dataProduct) {
      let idOrder = e.target.id;
      let itemOrder = 1;
      let infoCart = localStorage.getItem("infoCart");
      if (amountCartHeader == 0) {
        setCountCart(1);
      }
      if (infoCart) {
        order = JSON.parse(infoCart);
        Object.keys(order).map((key) => {
          if (idOrder == key) {
            return (itemOrder = order[idOrder] + 1);
          }
        });
      }
      amountCart();
      order[idOrder] = itemOrder;
      localStorage.setItem("infoCart", JSON.stringify(order));
      // localStorage.clear();
    }
  }
  function amountCart() {
    let infoCart = localStorage.getItem("infoCart");
    if (infoCart) {
      setCountCart(amountCartHeader + 1);
    }
  }

  function removeWishList(e) {
    if (dataProduct) {
      let idWishList = parseFloat(e.target.id);
      let infoWishList = localStorage.getItem("infoWishList");
      if (infoWishList) {
        wishList = JSON.parse(infoWishList);
        delete wishList[idWishList];
        setCountWishList(amountWishListHeader - 1);
      }
      localStorage.setItem("infoWishList", JSON.stringify(wishList));
    }
  }

  function productItem() {
    if (dataProduct) {
      let infoWishList = JSON.parse(localStorage.getItem("infoWishList"));
      if (infoWishList) {
        return Object.keys(infoWishList).map((item) => {
          return dataProduct.map((value, key) => {
            if (item == value.id) {
              let avatar = JSON.parse(value.image.split(","));
              return (
                <div key={key} className="col-sm-4 home">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img
                          style={{ width: "242px", height: "252px" }}
                          src={
                            "http://localhost/laravel/laravel/public/upload/user/product/" +
                            value.id_user +
                            "/" +
                            avatar[0]
                          }
                          alt=""
                        />
                        <span className="price overlay">${value.price}</span>
                        <p>{value.name}</p>
                        <a
                          onClick={addProduct}
                          href
                          id={value.id}
                          className="btn btn-default add-to-cart add"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </a>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <span className="price overlay">${value.price}</span>
                          <p>{value.name}</p>
                          <a
                            onClick={addProduct}
                            href
                            id={value.id}
                            className="btn btn-default add-to-cart add"
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </a>
                        </div>
                      </div>
                      <img
                        className="new"
                        src="http://localhost/laravel/laravel/public/upload/icon/new.png"
                        alt=""
                      />
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <Link to={"/Product/Detail/" + value.id}>
                            <i className="fa fa-plus-square" />
                            Product detail
                          </Link>
                        </li>
                        <li>
                          <a onClick={removeWishList} id={value.id} href>
                            <i className="fa fa-plus-square" />
                            Remove from wishlist
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
          });
        });
      }
    }
  }
  useEffect(() => {
    api
      .get("/product/wishlist")
      .then((res) => {
        console.log(res.data.data);
        setDataProduct(res.data.data);
        setCountCart(amountCartHeader);
        setCountWishList(amountWishListHeader);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        {/*features_items*/}
        <h2 className="title text-center">Wishlist</h2>
        {productItem()}
        <p className="result_price" />
      </div>
      {/*features_items*/}
      <div className="modal" id="myModal">
        <div style={{ margin: "100px auto" }} className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button
                style={{ margin: "10px" }}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p
                style={{ fontSize: "20px", display: "inline-block" }}
                className="cart-alert"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="button_modal"
                className="btn btn-success"
              >
                <a
                  style={{ color: "#fff" }}
                  href="http://localhost/laravel/laravel/public/yourCart"
                >
                  Go to cart
                </a>
              </button>
              <button
                type="button"
                id="button_modal"
                className="btn btn-success"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
