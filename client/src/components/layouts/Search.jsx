import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState("");
  const location = useLocation();
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };
  const clearKeyword = () => {
    setkeyword("");
  };
  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);
  return (
    <form onSubmit={searchHandler} className="d-flex">
      <input
        className=" px-2 search"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={keyword}
        onChange={(e) => setkeyword(e.target.value)}
      />
      <motion.button className="btn0" type="submit"
                                      whileTap={{ scale: 0.85 }}

      >
        Search
      </motion.button>
    </form>
  );
};

export default Search;
