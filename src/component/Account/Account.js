import React, { useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Account(props) {
  const userData = JSON.parse(localStorage["checkInfo"]);

  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    address: "",
    level: "0",
  });

  const [errors, setErrors] = useState({});

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState({});
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  function handleUserInputFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let idUser = userData.authUser.id;
    let url = "/user/update/" + idUser;
    let accessToken = userData.tokenUser;
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    const formData = new FormData();
    formData.append("email", userData.authUser.email);
    formData.append("name", inputs.name);
    formData.append("password", inputs.password);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("avatar", avatar);

    let errorSubmit = {};
    let flag = true;

    if (inputs.name === "") {
      flag = false;
      errorSubmit.name = "Name: Không được để trống";
    }

    if (inputs.phone === "") {
      flag = false;
      errorSubmit.phone = "Phone: Không được để trống";
    }

    if (inputs.address === "") {
      flag = false;
      errorSubmit.address = "Address: Không được để trống";
    }

    let errorImg = "";
    if (avatar !== "") {
      const getNameFile = file.name;
      const getSizeFile = file.size;
      const typeImg = getNameFile.split(".")[1];
      const checkType = arrayType.includes(typeImg);
      const errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
      errorImg = errorImgFile;
    }

    if (errorImg === true) {
      flag = false;
      errorSubmit.avatar =
        "Avatar: dung lượng ảnh phải lớn hơn 1MB hoặc không đúng định dạng ảnh";
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      api.post(url, formData, config).then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setErrors({});
          alert("Cập nhật thành công");
          let infoUser = {
            tokenUser: res.data.success.token,
            authUser: res.data.Auth,
          };
          localStorage.setItem("checkInfo", JSON.stringify(infoUser));
        }
      });
    }
  }

  function fetchData() {
    return (
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <input type="hidden" name="_token" defaultValue={userData.tokenUser} />
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Full Name (*)
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control "
              name="name"
              defaultValue={userData.authUser.name}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Email (*)
          </label>
          <div className="col-md-8">
            <input
              readOnly
              type="text"
              className="form-control "
              name="email"
              defaultValue={userData.authUser.email}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Password (*)
          </label>
          <div className="col-md-8">
            <input
              type="password"
              className="form-control "
              name="password"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Phone
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control "
              name="phone"
              defaultValue={userData.authUser.phone}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Address
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control "
              name="address"
              defaultValue={userData.authUser.address}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Avatar (*)
          </label>
          <div className="col-md-8">
            <input
              id="avatar"
              type="file"
              className="form-control "
              name="avatar"
              onChange={handleUserInputFile}
            />
          </div>
        </div>
        <div className="form-group row mb-0">
          <div className="col-md-8 offset-md-4">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="col-sm-9 padding-right">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>User Update</h3>
              </div>
              <div className="card-body">
                <br />
                <FormErrors errors={errors} />
                <br />
                {fetchData()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
