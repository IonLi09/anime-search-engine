import React from "react";
import Popular from "./Popular.js";
import Movie from "./Movie.js";
import Airing from "./Airing.js";
import { useGlobalContext } from "../context/global.js";
import styled from "styled-components";

function Home() {
  const [rendered, setRendered] = React.useState("popular");

  const {
    handleChange,
    handleSubmit,
    search,
    searchAnime,
    getPopular,
    getAiring,
    getMovie,
  } = useGlobalContext();

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "movie":
        return <Movie rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <HomeStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Anime"
              : rendered === "airing"
              ? "Airing Anime"
              : "Movies"}
          </h1>
        </div>
        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button
              onClick={() => {
                setRendered("popular");
                getPopular();
              }}
            >
              Popular
            </button>
          </div>
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRendered("airing");
                getAiring();
              }}
            >
              Airing
            </button>
          </div>
          <div className="filter-btn movie-filter">
            <button
              onClick={() => {
                setRendered("movie");
                getMovie();
              }}
            >
              Movie
            </button>
          </div>
        </div>
      </header>
      {switchComponent()}
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  background-color: #ededed;
  header {
    width: 60%;
    margin: 0 auto;
    padding: 2rem 5rem;
    transition: all 0.4s ease-in-out;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }
      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }
        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }
        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default Home;