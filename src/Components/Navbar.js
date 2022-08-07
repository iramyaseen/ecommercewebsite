import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar(props) {
  const NavbarItem = [
    {
      id: 1,
      name: "Home",
      toLink: "/",
    },
    {
      id: 2,
      name: "product",
      toLink: "/products",
    },
    {
      id: 3,
      name: "about us",
      toLink: "/about-us",
    },
    {
      id: 4,
      name: "contact us",
      toLink: "/contact-us",
    },
  ];
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href={() => false}>
            <img src={props.image} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {NavbarItem.map((items) => {
                return (
                  <li className="nav-item active" key={items.id}>
                    <NavLink
                      className="nav-link"
                      to={items.toLink}
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#3a8bcd" : "black",
                        };
                      }}
                    >
                      {items.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
