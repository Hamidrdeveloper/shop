import React, {createContext, ReactElement, useState} from 'react';
import {
  addFavoriteAc,
  allFavoritesAc,
  getAllFavoritesAc,
  removeFavoriteAc,
} from './Favorite.action';
import {Favorite} from './types';

interface IFavoriteContext {
  isFavorite: boolean;
  addFavoriteFn: (data: Favorite) => void;
  addAllFavoritesFn: (data: Favorite[]) => void;
  removeFavoriteFn: (id: number) => void;
  getAllFavoritesFn: () => void;
  favorite:Array<Favorite>;
}
export const FavoriteContext = createContext<IFavoriteContext>(
  {} as IFavoriteContext,
);
export default function FavoriteContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isFavorite, setFavorite] = useState(false);
  const [favorite, setDataFavorites] = useState([]);
  function addFavoriteFn(data: Favorite) {
    addFavoriteAc(data)
      .then(res => {})
      .catch(error => {});
  }
  function addAllFavoritesFn(data: Favorite[]) {
    allFavoritesAc(data)
      .then(res => {})
      .catch(error => {});
  }
  function removeFavoriteFn(id: number) {
    removeFavoriteAc(id)
      .then(res => {})
      .catch(error => {});
  }
  function getAllFavoritesFn() {
    getAllFavoritesAc()
      .then(res => {
        setDataFavorites(res);
      })
      .catch(error => {});
  }

  return (
    <FavoriteContext.Provider
      value={{
        isFavorite,
        addFavoriteFn,
        addAllFavoritesFn,
        removeFavoriteFn,
        getAllFavoritesFn,
        favorite,
      }}>
      {children}
    </FavoriteContext.Provider>
  );
}
