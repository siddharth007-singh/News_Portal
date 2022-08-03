// import React, { useContext, useReducer, useEffect } from 'react';
// import reducer from './reducer';

// let API = "http://hn.algolia.com/api/v1/search?";


// const initialState = {
//     isLoding:  true,
//     query:"CSS",
//     nbPages : 0,
//     page:0,
//     hits: [],
// };

// const AppContext = React.createContext();

// const AppProviders=({childern})=>{

//     const [state, dispatch] = useReducer(reducer, initialState);

//       const fetchApiData = async (url) => {
//       dispatch({ type: "SET_LOADING" });
  
//       try {
//         const res = await fetch(url);
//         const data = await res.json();
//         console.log(data);
//         dispatch({
//           type: "GET_STORIES",
//           payload: {
//             hits: data.hits,
//             nbPages: data.nbPages,
//           },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const removePost = (id)=> {
//         dispatch({type:"REMOVE_POST", payload: id});
//     }

//     const searchPost = (search_query)=>{
//         dispatch({type:"SEARCH_POST", payload: search_query});
//     }

//     //Pagination
//     const getPrevPage = ()=>{
//         dispatch({type:"PREV_PAGE"});
//     }

//     const getNextPage = ()=>{
//         dispatch({type:"NEXT_PAGE"});
//     }

//     useEffect(() => {
//         fetchApiData(`${API}query=${state.query}&page=${state.page}`);
//     },[state.query, state.page]);

//     return(
//         <AppContext.Provider value={{...state, removePost, searchPost, getPrevPage,getNextPage}}>
//             {childern}
//         </AppContext.Provider>
//     )
// };

// //Custom Hooks
// const useGlobalContext = ()=>{
//     return useContext(AppContext);
// };

// export {AppContext, AppProviders, useGlobalContext};


import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};

const AppContext = React.createContext();

// to create a provider fucntion
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const fecthApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // to remove the post
  const removePost = (post_ID) => {
    dispatch({ type: "REMOVE_POST", payload: post_ID });
  };

  // search
  const searchPost = (searchQuery) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: searchQuery,
    });
  };

  // pagination
  const getNextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };

  const getPrevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };

  // to call teh api func
  useEffect(() => {
    fecthApiData(`${API}  =${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };