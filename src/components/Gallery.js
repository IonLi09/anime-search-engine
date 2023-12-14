import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";

function Gallery() {
  const { id } = useParams();
  const { getAnimePictures, pictures } = useGlobalContext();

  const [index, setIndex] = useState(0);

  const handleImageClick = (i) => {
    setIndex(i);
  };

  React.useEffect(() => {
    getAnimePictures(id);
  }, []);

  return (
    <GalleryStyled>
      <div className="back">
        <Link to="/">Back</Link>
      </div>
      <div className="big-image">
        <img src={pictures[index]?.jpg.image_url} />
      </div>
      <div className="small-images">
        {pictures?.map((picture, i) => {
          return (
            <div
              className="image-container"
              onClick={() => {
                handleImageClick(i);
              }}
              key={i}
            >
              <img src={picture.jpg.image_url} alt="" />
            </div>
          );
        })}
      </div>
    </GalleryStyled>
  );
}

const GalleryStyled = styled.div`
  background-color: #ededed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    a {
      font-weight: 600;
      text-decoration: none;
      color: #eb5757;
    }
  }
  .big-image {
    display: inline-block;
    padding: 2rem;
    margin: 2rem 0;
    background-color: #fff;
    border-radius: 7px;
    border: 5px solid #e5e7eb;
    position: relative;
  }
  .small-images {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 80%;
    padding: 2rem;
    border-radius: 7px;
    background-color: #fff;
    border: 5px solid #e5e7eb;
    img {
      width: 6rem;
      height: 6rem;
      object-fit: cover;
      cursor: pointer;
      border-radius: 5px;
      border: 3px solid #e5e7eb;
    }
  }
`;

export default Gallery;
