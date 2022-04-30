import React, {createContext, ReactElement, useState} from 'react';
import {ProductsArrivalModel, ProductsModel} from './model';
import   * as Ac from './Product.action';
import {ProductItem} from './types';
import * as Type from './types';
interface IProductContext {
  isProducts: boolean;
  productsItem: ProductItem;
  productsFn: () => void;
  categoriesItem: any;
  productByID: Type.ProductVariation;
  categoriesFn: () => void;
  arrivalItem: any;
  arrivalFn: () => void;
  cardBottomArrivalItem: any;
  cardBottomArrivalFn: () => void;
  bestSellingFn: () => void;
  bestSellingItem: any;
  productByIdFn: (productId: number,navigation:any) => void;
  newProductsFn: () => void
  newProductsItem: any;
  relatedProductsFn: (id) => void
  relatedProductsItem: any;
  searchProductsFn: (text: string,categoryId:number) => void;
  categoryProductsItem: Array<any>;
  categoryLode:boolean;
}
export const ProductContext = createContext<IProductContext>(
  {} as IProductContext,
);
export default function ProductContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isProducts, setProducts] = useState(false);
  const [categoryLode, setCategoryLode] = useState(false);
  const [productsItem, setProductsItem] = useState<ProductItem>(null);
  const [categoriesItem, setCategoriesItem] = useState<any>();
  const [productByID, setProductByID] = useState<Type.ProductVariation>();
  const [arrivalItem, setArrivalFnItem] = useState<ProductItem>();
  const [cardBottomArrivalItem, setCardArrivalFnItem] = useState<ProductItem>();
  const [bestSellingItem, setBestSellingFnItem] = useState<ProductItem>();
  const [newProductsItem, setNewProductsItem] = useState<ProductItem>();
  const [relatedProductsItem, setRelatedProductsItem] = useState<ProductItem>();
  const [categoryProductsItem, setCategoryProductsItem] = useState<any>();
  // We can access navigation object via context
  function productsFn() {
    Ac.productsAc(ProductsModel).then(res => {
      console.log('productsFn', res);
      
      setProductsItem(res);
    
      
    });
  }
  function newProductsFn() {
    let dataPost = ProductsArrivalModel;
    dataPost.page=1;
    dataPost.per_page=100;
    dataPost.productCategoryIds ="";
    Ac.productsAc(dataPost).then(res => {
      setNewProductsItem(res);
    });
  }
  function categoriesFn() {
    Ac.categoriesAc().then(res => {
      console.log('categoriesFn', res);
      setCategoriesItem(res);
    });
  }
  function arrivalFn() {
    let dataPost = ProductsArrivalModel;
    dataPost.page=1;
    dataPost.per_page=12;
    dataPost.productCategoryIds ="76";
    Ac.productsAc(dataPost).then(res => {
      console.log('arrivalFn', res);
      setArrivalFnItem(res);
    });
  }
  function cardBottomArrivalFn() {
    let dataPost = ProductsArrivalModel;
    dataPost.page=1;
    dataPost.per_page=12;
    dataPost.productCategoryIds ="52";
    Ac.productsAc(dataPost).then(res => {
      console.log('arrivalFn', res);
      setCardArrivalFnItem(res);
    });
  }
  function bestSellingFn() {
    let dataPost = ProductsArrivalModel;
    dataPost.page=1;
    dataPost.per_page=12;
    dataPost.productCategoryIds ="75";
    Ac.productsAc(dataPost).then(res => {
      
      const n = 3
      const result = new Array(Math.ceil(res.length / n))
      .fill()
      .map(_ => res.splice(0, n))
      console.log("=====>check",result);
      
      setBestSellingFnItem(result);
    });
  }
  function productByIdFn(productId:number,navigation) {
    
    Ac.productByIdAc(productId).then(res => {
      setProductByID(res)
     
      
    });
  }
  function relatedProductsFn(categoryId:number) {
    let dataPost = ProductsArrivalModel;
    dataPost.page=1;
    dataPost.per_page=12;
    dataPost.productCategoryIds =categoryId.toString();
    Ac.productsAc(dataPost).then(res => {
      setRelatedProductsItem(res)
     
      
    });
  }
  function searchProductsFn(text:string,categoryId:number) {
    setCategoryProductsItem([]);
    setCategoryLode(true)
    let dataPost = ProductsArrivalModel;
    dataPost.search=text
    dataPost.productCategoryIds =categoryId.toString();
    Ac.productsAc(dataPost).then(res => {
     
      setCategoryLode(false)
      setCategoryProductsItem(res)
     
      
    });
  }

  return (
    <ProductContext.Provider
      value={{
        isProducts,
        productsFn,
        productsItem,
        categoriesFn,
        categoriesItem,
        arrivalItem,
        arrivalFn,
        productByIdFn,
        productByID,
        cardBottomArrivalFn,
        cardBottomArrivalItem,
        bestSellingFn,
        bestSellingItem,
        newProductsFn,
        newProductsItem,
        relatedProductsFn,
        relatedProductsItem,
        searchProductsFn,
        categoryProductsItem,
        categoryLode,
      }}>
      {children}
    </ProductContext.Provider>
  );
}
