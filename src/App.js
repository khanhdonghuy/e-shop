import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import MenuLeft from "./component/Layout/MenuLeft";
import MenuLeftAccount from "./component/Layout/MenuLeftAccount";
import { UserContext } from "./component/Layout/UserContext";

function App(props) {
  let params1 = useLocation();

  const [countCart, setCountCart] = useState(
    localStorage.getItem("countCart") || 0
  );

  const [countWishList, setCountWishList] = useState(
    localStorage.getItem("countWishList") || 0
  );

  const showAmountCart = (data) => {
    localStorage.setItem("countCart", data);
    setCountCart(data);
  };

  const showAmountWishList = (data) => {
    localStorage.setItem("countWishList", data);
    setCountWishList(data);
  };

  return (
    <UserContext.Provider
      value={{
        showAmountCart: showAmountCart,
        showAmountWishList: showAmountWishList,
        countCart,
        countWishList,
      }}
    >
      <Header />
      <section>
        <div className="container">
          <div className="row">
            {params1["pathname"].includes("/Account") ||
            params1["pathname"].includes("/MyProduct") ||
            params1["pathname"].includes("/AddProduct") ? (
              <MenuLeftAccount />
            ) : (
              <MenuLeft />
            )}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </UserContext.Provider>
  );
}
export default App;
