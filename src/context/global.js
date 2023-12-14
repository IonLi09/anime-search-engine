import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const baseURL = "https://api.jikan.moe/v4";

const LOADING = "LOADING";
const SEARCHING = "SEARCHING";
const GET_POPULAR = "GET_POPULAR";
const GET_MOVIE = "GET_MOVIE";
const GET_AIRING = "GET_AIRING";
const GET_PICTURES = "GET_PICTURES";

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case GET_POPULAR:
      return { ...state, popular: action.payload, isLoading: false };
    case SEARCHING:
      return { ...state, searchResults: action.payload, isLoading: false };
    case GET_AIRING:
      return { ...state, airing: action.payload, isLoading: false };
    case GET_MOVIE:
      return { ...state, movie: action.payload, isLoading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const initalState = {
    popular: [],
    upcoming: [],
    airing: [],
    pictures: [],
    isSearching: false,
    searchResults: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(reducer, initalState);
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearching = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearching = true;
    } else {
      state.isSearching = false;
      alert("Please enter a search term");
    }
  };

  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseURL}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCHING, payload: data.data });
  };

  const getPopular = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR, payload: data.data });
  };

  const getMovie = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?type=movie`);
    const data = await response.json();
    dispatch({ type: GET_MOVIE, payload: data.data });
  };

  const getAiring = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING, payload: data.data });
  };

  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/characters/${id}/pictures`);
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  React.useEffect(() => {
    getPopular();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopular,
        getAiring,
        getMovie,
        getAnimePictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
