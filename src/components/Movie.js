import React from "react";
import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Movie({ rendered }) {
  const { movie, isSearching, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearching && rendered === "movie") {
      return movie?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </Link>
        );
      });
    } else {
      return searchResults.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </Link>
        );
      });
    }
  };
  return (
    <MovieStyle>
      <div className="movie-anime">{conditionalRender()}</div>
    </MovieStyle>
  );
}

const MovieStyle = styled.div`
  display: flex;
  .movie-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: white;
    border-top: 5px solid #e5e7eb;
  }
  a {
    height: 500px;
    border-radius: 7px;
    border: 5px solid #e5e7eb;
  }
  a img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export default Movie;
