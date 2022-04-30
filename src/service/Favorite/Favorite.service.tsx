import React from 'react';
import Storage from '../../utils/storeData';
import { Favorite } from './types';
const FAVORITE_KEY = "favorites";

class FavoriteDataService {
  async addAllFavorites (favorites: Favorite[]): Promise<boolean>  {

   return Storage.storeData(FAVORITE_KEY,JSON.stringify(favorites))

  };
  
  async addFavorite (favorite: Favorite): Promise<boolean> {
   
   return Storage.storeData(FAVORITE_KEY,JSON.stringify(favorite))
   
  };
  
  async removeFavorite (id: number): Promise<boolean> {
    try {
      return Storage.removeData(FAVORITE_KEY).then(res=>{
        return true;
      })
    } catch {
      return false;
    }
  };
  
  async getAllFavorites  (): Promise<Favorite[]> {
    try {
    
      Storage.retrieveData(FAVORITE_KEY).then(res => {
       
      return res;
      });
    } catch {
      return [];
    }
  };
}
export default new FavoriteDataService();
