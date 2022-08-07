import React, { useState, useEffect } from "react";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import Banner from "./Banner";
import Navbar from "./Navbar";
import LogoImage from "../assets/images/header-logo.png";
import { Circles } from "react-loading-icons";
import { useGetAllProductsQuery } from "../featucer/ProductApi";
import { addToCart } from "../featucer/CartsSlice";
export default function SingleProduct() {
  const pram = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getOrder = async (e) => {
    e.preventDefault();
    const main = localStorage.getItem("token");
    if (main) {
      alert("Successfully your order add to cart");
    } else {
      alert("You are not login. Please login your page");
      navigate("/contact-us");
    }
  };

  useEffect(() => {
    const getApiProduct2 = async () => {
      setLoading(true);
    };
    getApiProduct2();
  }, [pram.id]);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    const main = localStorage.getItem("token");
    if (main) {
      dispatch(addToCart(product));
      navigate("/cart-products");
      alert("Your order is get");
    } else {
      alert("You are not login. Please login your page");
      navigate("/contact-us");
    }
  };
  const { data } = useGetAllProductsQuery();

  const updatePram = Number(pram.id) - 1;

  return (
    <>
      {loading ? (
        <>
          <Banner />
          <Navbar image={LogoImage} />
          <div className="single-product">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-heading">
                    <div className="line-dec"></div>
                    <h1>Single product</h1>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-slider">
                    <div id="carousel" className="flexslider">
                      <img src={data?.[updatePram]?.image} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="right-content">
                    <h3>{data?.[updatePram]?.title}</h3>
                    <h6>{data?.[updatePram]?.price + "$"}</h6>
                    <p>{data?.[updatePram]?.description}</p>
                    <span>7 left on stock</span>
                    <form>
                      <button
                        className="button"
                        onClick={() => {
                          handleAddToCart(data?.[updatePram]);
                        }}
                      >
                        add to cart
                      </button>
                    </form>
                    <div className="down-content">
                      <div className="categories">
                        <h6>
                          Category:{" "}
                          <span>
                            <a href="#">{data?.[updatePram]?.category}</a>
                          </span>
                        </h6>
                      </div>
                      <div className="share">
                        <h6>
                          Share:{" "}
                          <span>
                            <a
                              href="https://twitter.com/home"
                              target="blank"
                              className="social-icons2"
                            >
                              <BsTwitter />
                            </a>
                            <a
                              href="https://instragram.com/home"
                              className="social-icons2"
                            >
                              <FaInstagram />
                            </a>
                            <a
                              href="https://facebook.com/home"
                              className="social-icons2"
                            >
                              <BsFacebook />
                            </a>
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loader">
          <Circles fill="#000" />
        </div>
      )}
    </>
  );
}
