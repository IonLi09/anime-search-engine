import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function AnimeItem() {
  const { id } = useParams();

  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  // const [showMore, setShowMore] = useState(false);

  const {
    aired,
    duration,
    episodes,
    images,
    popularity,
    rank,
    rating,
    score,
    scored_by,
    season,
    status,
    synopsis,
    title,
    title_english,
    year,
    trailer,
  } = anime;

  // get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <AnimeItemStyled>
      <div>
        <h1>
          {title} / {title_english}
        </h1>
        <div className="details">
          <div className="image">
            <img src={images?.jpg.large_image_url} />
          </div>
          <div className="opinion-info">
            <p className="score-info">
              <span>Score:</span>
              <span className="score info-data">{score}</span>
              <span className="users">{scored_by}</span>
              <span className="users">users</span>
            </p>
            <p>
              <span>Rank:</span>
              <span className="info-data">{rank}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span className="info-data">{popularity}</span>
            </p>
          </div>
          <div className="trailer-container">
            {trailer?.embed_url ? (
              <iframe
                src={trailer?.embed_url}
                title={title}
                width="100%"
                height="auto"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <h3>Trailer not available</h3>
            )}
          </div>
          <div className="anime-info">
            <h4 className="title">Information</h4>
            <p>
              <span>Year: </span>
              <span>{year}</span>
            </p>
            <p>
              <span>Aired: </span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Duration: </span>
              <span>{duration}</span>
            </p>
            <p>
              <span>Season: </span>
              <span>{season}</span>
            </p>
            <p>
              <span>Episodes: </span>
              <span>{episodes}</span>
            </p>
            <p>
              <span>Rating: </span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Status: </span>
              <span>{status}</span>
            </p>
          </div>
          <div className="synopsis">
            <h3 className="title">Synopsis</h3>
            <p className="description">{synopsis}</p>
          </div>
        </div>
        <h3 className="title">Characters</h3>
        <div className="characters">
          {/* <h3 className="title">Characters</h3> */}
          {characters?.map((character, index) => {
            const { role } = character;
            const { name, images, mal_id } = character.character;
            return (
              <Link to={`/character/${mal_id}`} key={index}>
                <div className="character">
                  <img src={images?.jpg.image_url} alt="" />
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  padding: 3rem 15rem;
  background-color: #ededed;
  h1 {
    margin-bottom: 1rem;
  }
  .details {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 30% 30% 40%;
    grid-template-rows: 33% 33% 33%;
    // height: 600px;
    grid-gap: 1rem;
    background-color: #fff;
    padding: 3rem;
    border: 5px solid #e5e7eb;
    border-radius: 5px;
  }
  .image {
    grid-row: 1 / 3;
  }
  .image img {
    width: 100%;
    object-fit: cover;
  }
  .anime-info {
    grid-row: 3 / 4;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    p {
      color: #6c7983;
    }
  }
  .synopsis {
    grid-column: 2 / span 2;
    grid-row: 2 / span 2;
    align-self: start;
    padding-right: 2rem;
  }
  .opinion-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #ededed;
    border: 2px solid #e5e7eb;
    border-radius: 5px;
  }
  .opinion-info p {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
  }
  .score-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .score {
    font-weight: 700;
    font-size: 2rem;
  }
  .users {
    font-size: 0.8rem;
  }
  .info-data {
    font-weight: 700;
  }
  .description {
    color: #6c7983;
    line-height: 1.7rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: black;
      font-weight: 600;
    }
  }
  .title {
    border-bottom: 1px solid;
    margin: 0.25rem 0;
  }
  .trailer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 2px solid #e5e7eb;
      background-color: #ffffff;
      border-radius: 5px;
    }
  }
  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 5px;
    border: 5px solid #e5e7eb;
    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #ededed;
      transition: all 0.4s ease-in-out;
      img {
        width: 100%;
      }
      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }
      p {
        color: #27ae60;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export default AnimeItem;
