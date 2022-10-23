import { useState } from "react";
import FormErrors from "../FormErrors";

function Register(props) {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
    level: "",
  });
  const [errors, setErrors] = useState({});
  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  }
  const [avatar, setAvatar] = useState('');
  const [file,setFile] = useState({});
  function handleUserInputFile(e) {
    const file = e.target.files;
    let reader = new FileReader();
    handleFile(e)
    reader.onload = (e) =>{
        setAvatar(e.target.result);
        setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }

  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];
  let errorImg = "";
  function handleFile(e) {
    const getNameFile = e.target.files[0].name;
    const getSizeFile = e.target.files[0].size;
    const typeImg = getNameFile.split(".")[1];
    const checkType = arrayType.includes(typeImg);
    const errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
    errorImg = errorImgFile;
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;
    if (inputs.name == "") {
      flag = false;
      errorSubmit.name = "vui long nhap ten";
    }
    if (inputs.email == "") {
      flag = false;
      errorSubmit.email = "vui long nhap email";
    }
    if (inputs.password == "") {
      flag = false;
      errorSubmit.password = "vui long nhap password";
    }
    if (inputs.phone == "") {
      flag = false;
      errorSubmit.phone = "vui long nhap phone";
    }
    if (inputs.address == "") {
      flag = false;
      errorSubmit.address = "vui long nhap address";
    }
    if (errorImg === true) {
      flag = false;
      errorSubmit.avatar = "dung luong file khong qua 1MB";
    }
    if (inputs.level == "") {
      flag = false;
      errorSubmit.level = "vui long nhap level";
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      alert("Đăng ký thành công");
    }
  }
  return (
    <div>
      <FormErrors errors={errors} />
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleInput}></input>
        <br />
        <input name="email" placeholder="Email" onChange={handleInput}></input>
        <br />
        <input
          name="password"
          placeholder="Password"
          onChange={handleInput}
        ></input>
        <br />
        <input name="phone" placeholder="Phone" onChange={handleInput}></input>
        <br />
        <input
          name="address"
          placeholder="Address"
          onChange={handleInput}
        ></input>
        <br />
        <input name="avatar" type="file" onChange={handleUserInputFile}></input>
        <br />
        {/* <input name="level" placeholder="Level"></input> */}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Register;
