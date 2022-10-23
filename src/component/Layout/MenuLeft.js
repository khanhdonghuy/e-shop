import { useEffect, useState } from "react";
import api from "../API/api";

function MenuLeft(){
  const [data, setData] = useState('')
function listCategory() {
  if (data.message === 'success') {
    if (data.category.length >0) {
      return data.category.map((value,key)=>{
        return(
          <div key={key} className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title"><a href>{value.category}</a></h4>
              </div>
            </div>
        )
      })
    }
  }
}

function listBrand() {
  if (data.message === 'success') {
    if (data.brand.length >0) {
      return data.brand.map((value,key)=>{
        return(
          <li key={key}><a href> <span className="pull-right"></span>{value.brand}</a></li>
        )
      })
    }
  }
}

  useEffect(()=>{
    api.get("/category-brand")
    .then((res)=>{
      setData(res.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[])
    return(
        <>
<div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Category</h2>
          <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
            {listCategory()}
          </div>{/*/category-products*/}
          <div className="brands_products">{/*brands_products*/}
            <h2>Brands</h2>
            <div className="brands-name">
              <ul className="nav nav-pills nav-stacked">
              {listBrand()}
                {/* <li><a href> <span className="pull-right">(50)</span>Acne</a></li> */}
              </ul>
            </div>
          </div>{/*/brands_products*/}
          {/* <div className="price-range"> */}
          {/*price-range*/}
            {/* <h2>Price Range</h2>
            <div className="well">
              <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
              <b>$ 0</b> <b className="pull-right">$ 600</b>
            </div>
          </div> */}
          {/*/price-range*/}
          <div className="shipping text-center">{/*shipping*/}
            <img src="http://localhost/laravel/laravel/public/frontend/images/home/shipping.jpg" alt="" />
          </div>{/*/shipping*/}
        </div>
      </div>
      </>
    )
}
export default MenuLeft;