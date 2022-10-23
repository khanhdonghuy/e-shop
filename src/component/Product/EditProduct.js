import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function EditProduct(props) {
  const navigate = useNavigate();
  let deleteImage = useRef([]).current
  const [errors, setErrors] = useState({});
  const [dataProduct, setDataProduct] = useState("");
  const [dataCate_Brand, setDataCate_Brand] = useState("");
  const [inputs, setInputs] = useState({
    category: "",
    brand: "",
    name: "",
    price: "",
    company: "",
    detail: "",
    sale: "",
    status: "",
  });
  const [avatar, setAvatar] = useState("");
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  const userData = JSON.parse(localStorage["checkInfo"]);
  let params = useParams();
  let idProduct = params.id;

  let accessToken = userData.tokenUser;
  let url = "/user/product/" + idProduct;
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  function categoryItem() {
    if (dataCate_Brand.message === "success") {
      if (dataCate_Brand.category.length > 0) {
        const listCategory = dataCate_Brand.category.map((value, key) => {
          return (
            <option key={key} value={value.id}>
              {value.category}
            </option>
          );
        });
        return (
          <div className="form-group col-md-10">
            <select
              name="category"
              value={
                inputs.category === ""
                  ? dataProduct.id_category
                  : inputs.category
              }
              onChange={handleInput}
              className="form-control form-control-line"
            >
              {listCategory}
            </select>
          </div>
        );
      }
    }
  }

  function brandItem() {
    if (dataCate_Brand.message === "success") {
      if (dataCate_Brand.category.length > 0) {
        const listBrand = dataCate_Brand.brand.map((value, key) => {
          return (
            <option key={key} value={value.id}>
              {value.brand}
            </option>
          );
        });
        return (
          <div className="form-group col-md-10">
            <select
              name="brand"
              value={inputs.brand === "" ? dataProduct.id_brand : inputs.brand}
              onChange={handleInput}
              className="form-control form-control-line"
            >
              {listBrand}
            </select>
          </div>
        );
      }
    }
  }

  function sale() {
    return (
      <>
        <div>
          <select
            value={inputs.status === "" ? dataProduct.status : inputs.status}
            onChange={handleInput}
            name="status"
            className="form-control form-control-line"
          >
            <option id="new" name="status" value="1">
              New
            </option>
            <option id="sale" name="status" value="0">
              Sale
            </option>
          </select>
        </div>
      </>
    );
  }

  function haveSale() {
    if (dataProduct) {
      if (dataProduct.status == "0" || inputs.status == "0") {
        return (
          <>
            <div className="col-md-2">
              <label>Sale</label>
            </div>
            <div className="form-group col-md-10">
              <input
                onChange={handleInput}
                className="form-control"
                type="number"
                name="sale"
                defaultValue={
                  inputs.sale === "" ? dataProduct.sale : inputs.sale
                }
              />
            </div>
          </>
        );
      }
    }
  }

  function handleUserInputFile(e) {
    const avatar = e.target.files;
    setAvatar(avatar);
  }
  function showAvatar() {
    if (dataProduct !== '') {
      return dataProduct.image.map((value, key) => {
        return (
          <div
            key={key}
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              className="imageProduct"
              style={{ width: "100px", height: "100px" }}
              src={
                "http://localhost/laravel/laravel/public/upload/user/product/" +
                dataProduct.id_user +
                "/" +
                value
              }
              alt=""
            />
            <input
              type="checkbox"
              name="avatarCheckBox[]"
              onClick={deleteImg}
              style={{
                position: "absolute",
                top: "3px",
                right: "3px",
              }}
              value={value}
            />
          </div>
        );
      });
    }
  }

  function deleteImg(e) {
    let valueImg = e.target.value;
    if (deleteImage.length === 0) {
      deleteImage.push(valueImg);
    } else {
      if (deleteImage.includes(valueImg)) {
        deleteImage = deleteImage.filter(img => img !== valueImg);
      } else {
        deleteImage.push(valueImg);
      }
    }

  }
  

  function handleSubmit(e) {
    e.preventDefault();
    let urlEdit = "/user/edit-product/" + idProduct;
  let formData = new FormData();
  formData.append("name", inputs.name === "" ? dataProduct.name : inputs.name);
  formData.append(
    "price",
    inputs.price === "" ? dataProduct.price : inputs.price
  );
  formData.append(
    "category",
    inputs.category === "" ? dataProduct.id_category : inputs.category
  );
  formData.append(
    "brand",
    inputs.brand === "" ? dataProduct.id_brand : inputs.brand
  );
  formData.append(
    "company",
    inputs.company === "" ? dataProduct.company : inputs.company
  );
  formData.append(
    "detail",
    inputs.detail === "" ? dataProduct.detail : inputs.detail
  );
  formData.append(
    "status",
    inputs.status === "" ? dataProduct.status : inputs.status
  );
  formData.append("sale", inputs.sale === "" ? (dataProduct.sale === null ? '' : dataProduct.sale) : inputs.sale);

  deleteImage.map((value, key) => (
    formData.append("avatarCheckBox[]", value)
  ));
  Object.keys(avatar).map((item, i) => (
    formData.append("file[]", avatar[item])
  ));
    let errorSubmit = {};
    let flag = true;
    if (avatar === "") {
      flag = false;
      errorSubmit.avatar = "Avatar upload: Không được để trống";
    } else {
      if (dataProduct && deleteImage) {
        if (avatar.length + dataProduct.image.length - deleteImage.length > 3) {
          flag = false;
          errorSubmit.avatar = "Avatar product: Không được quá 3 hình";
        } else {
          Object.keys(avatar).map((item, i) => {
            let getNameFile = avatar[item].name;
            let getSizeFile = avatar[item].size;
            let typeImg = getNameFile.split(".")[1];
            let checkType = arrayType.includes(typeImg);
            let errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
            if (errorImgFile === true) {
              flag = false;
              errorSubmit.avatar = "Avatar: dung lượng ảnh phải lớn hơn 1MB hoặc không đúng định dạng ảnh";
            }
          });
        }
      }
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      api.post(urlEdit, formData, config)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          deleteImage = [];
          // setDataProduct((state) => ({...state, image: JSON.parse(res.data.data.image)}));
          alert("Cập nhập sản phẩm thành công");
          navigate('/MyProduct')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  useEffect(() => {
    api
      .get(url, config)
      .then((res) => {
        console.log(res.data.data);
        setDataProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/category-brand")
      .then((res) => {
        setDataCate_Brand(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="container-fluid">
          <div className="product-details">
            {/*product-details*/}
            <div className="product-information" style={{ paddingLeft: 0 }}>
              {/*/product-information*/}
              <div className="contact-form">
                <h2 className="title text-center">Product Information</h2>
                <form
                  id="main-contact-form"
                  className="contact-form row"
                  name="contact-form"
                  encType="multipart/form-data"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue={userData.tokenUser}
                  />
                  <FormErrors errors={errors} />
                  <div className="col-md-2">
                    <label>Name</label>
                  </div>
                  <div className="form-group col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleInput}
                      defaultValue={
                        inputs.name === "" ? dataProduct.name : inputs.name
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Price</label>
                  </div>
                  <div className="form-group col-md-10">
                    <input
                      onChange={handleInput}
                      type="number"
                      className="form-control"
                      name="price"
                      defaultValue={
                        inputs.price === "" ? dataProduct.price : inputs.price
                      }
                    />
                    {/* <input hidden id="price" name="price" defaultValue={56} /> */}
                  </div>

                  <div className="col-md-2">
                    <label>Category</label>
                  </div>
                  {categoryItem()}

                  <div className="col-md-2">
                    <label>Brand</label>
                  </div>
                  {brandItem()}
                  <div className="form-group col-md-2">
                    <label>Status</label>
                  </div>
                  <div className="form-group col-md-10">{sale()}</div>
                  {haveSale()}
                  <div className="col-md-2">
                    <label>Detail</label>
                  </div>
                  <div className="form-group col-md-10">
                    <textarea
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      name="detail"
                      defaultValue={
                        inputs.detail === ""
                          ? dataProduct.detail
                          : inputs.detail
                      }
                      rows={9}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <input
                      type="file"
                      name="file[]"
                      className="form-control"
                      multiple
                      onChange={handleUserInputFile}
                    />
                  </div>
                  <div className="col-sm-12">
                    <div className="view-product">
                      <h4>Choose image you want to delete</h4>
                      {showAvatar()}
                    </div>
                  </div>
                  <div className="form-group col-md-10">
                    <button
                      style={{ marginLeft: 0, marginTop: "50px" }}
                      type="submit"
                      className="btn btn-default cart"
                    >
                      Update your product
                    </button>
                    <Link
                      className="btn btn-default"
                      style={{
                        color: "#fff",
                        background: "#989898",
                        display: "inline-block",
                        margin: "50px 0 10px 10px",
                        border: "0 none",
                        fontSize: "15px",
                        borderRadius: 0,
                      }}
                      to="/MyProduct"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            {/*/product-information*/}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
