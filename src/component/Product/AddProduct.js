import React, { useEffect, useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function AddProduct(props) {
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    category: "",
    brand: "",
    name: "",
    price: "",
    company: "",
    detail: "",
    avatar: "",
    sale: "",
    status: '1'
  });
  const [data, setData] = useState("");
  const userData = JSON.parse(localStorage["checkInfo"]);

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  function brandItem() {
    if (data.message === "success") {
      if (data.category.length > 0) {
        return data.brand.map((value, key) => {
          return (
            <option key={key} value={value.id}>
              {value.brand}
            </option>
          );
        });
      }
    }
  }

  function categoryItem() {
    if (data.message === "success") {
      if (data.category.length > 0) {
        const listCategory = data.category.map((value, key) => {
          return (
            <option key={key} value={value.id}>
              {value.category}
            </option>
          );
        });
        return (
          <div className="form-group col-md-12">
            <select
              value={inputs.category}
              onChange={handleInput}
              name="category"
            >
              <option value>Please select category</option>
              {listCategory}
            </select>
          </div>
        );
      }
    }
  }
  function sale() {
    return (
      <div>
        <select value={inputs.status} onChange={handleInput} name="status">
          <option id="new" name="status" value="1">
            New
          </option>
          <option id="sale" name="status" value="0">
            Sale
          </option>
        </select>
      </div>
    );
  }

  const [avatar, setAvatar] = useState("");
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  function handleUserInputFile(e) {
    const avatar = e.target.files;
    setAvatar(avatar);
  }

  let accessToken = userData.tokenUser;
    let url = "/user/add-product";
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    let formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("category", inputs.category);
    formData.append("brand", inputs.brand);
    formData.append("company", inputs.company);
    formData.append("detail", inputs.detail);
    formData.append("status", inputs.status);
    formData.append("sale", inputs.sale);

    Object.keys(avatar).map((item, i) => {
      formData.append("file[]", avatar[item]);
    });
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (inputs.name === "") {
      flag = false;
      errorSubmit.name = "Name: Không được để trống";
    }
    if (inputs.brand === "") {
      flag = false;
      errorSubmit.brand = "Brand: Vui lòng chọn ";
    }
    if (inputs.category === "") {
      flag = false;
      errorSubmit.category = "Category: Vui lòng chọn";
    }
    if (inputs.price === "") {
      flag = false;
      errorSubmit.price = "Price: Không được để trống";
    }
    if (inputs.company === "") {
      flag = false;
      errorSubmit.company = "Company: Không được để trống";
    }
    if (inputs.detail === "") {
      flag = false;
      errorSubmit.detail = "Detail: Không được để trống";
    }

    if (avatar === "") {
      flag = false;
      errorSubmit.avatar = "Avatar: Không được để trống";
    } else {
      if (avatar.length > 3) {
        flag = false;
        errorSubmit.avatar = "Avatar: Không được quá 3 hình";
      } else {
        Object.keys(avatar).map((item, i) => {
          let getNameFile = avatar[item].name;
          let getSizeFile = avatar[item].size;
          let typeImg = getNameFile.split(".")[1];
          let checkType = arrayType.includes(typeImg);
          let errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
          if (errorImgFile === true) {
            flag = false;
            errorSubmit.avatar =
              "Avatar: dung lượng ảnh phải lớn hơn 1MB hoặc không đúng định dạng ảnh";
          }
        });
      }
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      api.post(url, formData, config).then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          alert("Thêm sản phẩm thành công");
        }
      });
    }
  }
  useEffect(() => {
    api
      .get("/category-brand")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Add Product</h3>
            </div>
            <br />
            <div className="card-body">
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
                <div className="form-group col-md-12">
                  <input
                    onChange={handleInput}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    defaultValue=""
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    onChange={handleInput}
                    type="number"
                    className="form-control"
                    // hidden
                    id="price"
                    name="price"
                    defaultValue=""
                    placeholder="Price"
                  />
                </div>
                {categoryItem()}
                <div className="form-group col-md-12">
                  <select
                    value={inputs.brand}
                    onChange={handleInput}
                    name="brand"
                  >
                    <option value>Please select brand</option>

                    {brandItem()}
                  </select>
                </div>
                <div className="form-group col-md-12">{sale()}</div>
                {inputs.status === "0" ? (
                  <div className="form-group col-md-12">
                    <>
                      <input
                        onChange={handleInput}
                        type="number"
                        id="value_sale"
                        name="sale"
                      />
                      %
                    </>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group col-md-12">
                  <textarea
                    onChange={handleInput}
                    name="company"
                    id="company_profile"
                    className="form-control"
                    placeholder="Company"
                    defaultValue=""
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    onChange={handleUserInputFile}
                    type="file"
                    name="file[]"
                    className="form-control"
                    multiple
                  />
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    onChange={handleInput}
                    name="detail"
                    id="detail"
                    className="form-control"
                    placeholder="Detail"
                    defaultValue=""
                    rows={9}
                  />
                </div>

                <div className="form-group col-md-12">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-primary pull-right"
                    defaultValue="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
