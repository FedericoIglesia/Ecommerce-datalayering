export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CART_ITEMS = "GET_CART_ITEMS";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";

export const getAllProducts = () => {
  return async function (dispatch) {
    return fetch("https://apimocha.com/clothing/products")
      .then((res) => res.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: json,
        })
      );
  };
};

export const filterByCategory = (payload) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload,
  };
};

export const selectedCategory = (payload) => {
  return {
    type: SELECTED_CATEGORY,
    payload,
  };
};

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const getCartItems = () => {
  return {
    type: GET_CART_ITEMS,
    payload,
  };
};

export const getProductDetail = (payload) => {
  return {
    type: GET_PRODUCT_DETAIL,
    payload,
  };
};
