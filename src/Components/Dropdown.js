import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoryProductsFetch } from "../featucer/Categroy";
const Dropdown = ({ setselected }) => {
  const [isActive, setIsActive] = useState(false);
  const [options, setOption] = useState([]);
  const [optionsClick, setOptionClick] = useState([]);
  useEffect(() => {
    const catOptions = async () => {
      const options = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      setOption(await options.json());
    };
    catOptions();
  }, []);
  const dispatch = useDispatch();
  const categories = (category) => {
    dispatch(categoryProductsFetch(category));
  };
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        All categories
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => {
            return (
              <div
                onClick={(e) => {
                  setselected(option);
                  setIsActive(false);
                }}
                key={option}
              >
                <div
                  className="dropdown-item"
                  onClick={() => categories(option)}
                >
                  <NavLink
                    onClick={(e) => setOptionClick(e.target.value)}
                    to={`/products/${option}`}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#3a8bcd" : "black",
                      };
                    }}
                  >
                    {option}
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
