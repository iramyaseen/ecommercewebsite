import React, { useState } from "react";
import { BsEyeSlash, BsEyeFill, BsTwitter } from "react-icons/bs";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
const Contact = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toggleBtn = (e) => {
    e.preventDefault();
    setShowPassword((passwords) => !passwords);
  };

  const LoginForm = async (e) => {
    e.preventDefault();
    const data = {
      password,
      username,
    };
    await axios
      .post("https://fakestoreapi.com/auth/login", data)
      .then((res) => localStorage.setItem("token", res.data.token));
  };
  return (
    <>
      <div className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h1>Contact Us</h1>
              </div>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="right-content">
                <div className="container">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            className="form-control"
                            placeholder="Your email..."
                            required={require}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            defaultValue=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-6">
                        <fieldset
                          className="field-set"
                          style={{ display: "flex" }}
                        >
                          <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="form-control styel-control"
                            placeholder="Your password..."
                            required=""
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            defaultValue=""
                          />
                          <span
                            onClick={toggleBtn}
                            style={{ paddingTop: "5px", fontSize: "20px" }}
                          >
                            {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
                          </span>
                        </fieldset>
                      </div>
                      <div className="col-md-12">
                        <fieldset>
                          <button
                            type="submit"
                            className="button"
                            onClick={LoginForm}
                          >
                            <NavLink
                              to="/"
                              style={({ isActive }) => {
                                return {
                                  color: isActive ? "white" : "white",
                                };
                              }}
                            >
                              Send Message
                            </NavLink>
                          </button>
                        </fieldset>
                      </div>
                      <div className="col-md-12">
                        <div className="share">
                          <h6>
                            You can also keep in touch on:{" "}
                            <span>
                              <a
                                href="https://twitter.com/home"
                                target="blank"
                                className="social-icons3"
                              >
                                <BsTwitter />
                              </a>
                              <a
                                href="https://www.instagram.com/"
                                target="blank"
                                className="social-icons3"
                              >
                                <FaInstagram />
                              </a>
                              <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                className="social-icons3"
                              >
                                <FaLinkedin />
                              </a>
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
