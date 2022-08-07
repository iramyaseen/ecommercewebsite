import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

import { useGetAllProductsQuery } from "../featucer/ProductApi";
import { addToCart } from "../featucer/CartsSlice";
import { categoryProductsFetch } from "../featucer/Categroy";
import { Circles } from "react-loading-icons";

const Product = () => {
  const [selected, setselected] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  let param = useParams();
  const { data } = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart-products");
  };

  useEffect(() => {
    dispatch(categoryProductsFetch(param.category)).then((categoryItems) => {
      setProductsData(categoryItems.payload);
    });
    setLoading(true);
  }, [param.category]);

  return (
    <>
      {loading ? (
        <div className="featured-items">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <div className="line-dec"></div>
                  <div className="nav_bar">
                    <h1>Featured Items</h1>
                    <div
                      style={{
                        display: "flex",
                        fontSize: "19px",
                        fontWeight: "bold",
                      }}
                    >
                      <NavLink
                        to="/products"
                        style={({ isActive }) => {
                          return {
                            color: isActive ? "#3a8bcd" : "black",
                          };
                        }}
                      >
                        All product
                      </NavLink>
                      <Dropdown
                        selected={selected}
                        setselected={setselected}
                        style={({ isActive }) => {
                          return {
                            color: isActive ? "#3a8bcd" : "black",
                          };
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="" style={{ display: "flex", flexWrap: "wrap" }}>
                  {window.location.pathname ===
                  `/products/${encodeURIComponent(param.category)}`
                    ? productsData?.map((cate) => {
                        return (
                          <NavLink to={`/products/single-product/${cate.id}`}>
                            <div className="featured-item" key={cate.id}>
                              <div className="featured-item-image">
                                <img src={cate.image} alt="Item 1" />
                                <h4>{cate.title}</h4>
                                <h6>Price : {cate.price}$</h6>
                                <button
                                  className="button"
                                  onClick={() => handleAddToCart(cate)}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </NavLink>
                        );
                      })
                    : data?.map((produt) => {
                        return (
                          <NavLink
                            to={`/products/single-product/${produt.id}`}
                            key={produt.id}
                          >
                            <div className="featured-item" key={produt.id}>
                              <div
                                className="featured-item-image"
                                key={produt.id}
                              >
                                <img src={produt.image} alt="Item 1" />
                                <h4>{produt.title}</h4>
                                <h6>Price : {produt.price}$</h6>
                              </div>
                            </div>
                          </NavLink>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          {/* <Circles fill="#000" /> */}
          loading...
        </div>
      )}
    </>
  );
};
export default Product;
