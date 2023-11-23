import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  fetchAnother,
} from "./actions";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const initial = {
  favs: readFavsFromLocalStorage(),
  current: null,
  error: null,
  loading: true,
};

export function writeFavsToLocalStorage(favs) {
  localStorage.setItem("s10g4", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  if (!JSON.parse(localStorage.getItem("s10g4"))) return [];
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      const isAlreadyInFavs = state.favs.find(item => item.key === action.payload.key);
      if (!isAlreadyInFavs) {
        writeFavsToLocalStorage([...state.favs, action.payload]);
        toast.success(`Favoriye eklenmiştir`);
        return {
          ...state,
          favs: [...state.favs, action.payload]
        };
      } else {
        return state;
      }

    case FAV_REMOVE:
      toast.info("Favori listesinden çıkarılmıştır.");
      writeFavsToLocalStorage(
        state.favs.filter((item) => item.key !== action.payload)
      );
      return {
        ...state,
        favs: state.favs.filter((item) => item.key !== action.payload),
      };

    case FETCH_SUCCESS:
      toast.success("Sayfa başarılı bir şekilde yüklenmiştir.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return {
        ...state,
        current: action.payload,
        loading: false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() };

    default:
      return state;
  }
};