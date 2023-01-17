export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CART_ITEMS = "GET_CART_ITEMS";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const GREY_FLAG = "GREY_FLAG";
export const SAVE_PRICE = "SAVE_PRICE";
export const SAVE_QTY = "SAVE_QTY";
export const ADD_QTY = "ADD_QTY";
export const SUB_QTY = "SUB_QTY";
export const CURRENCY_CONVERTER = "CURRENCY_CONVERTER";

export const getAllProducts = () => {
  return async function (dispatch) {
    // return fetch("https://apimocha.com/clothing/products")
    return fetch("https://mocki.io/v1/6dcd97f7-5aa4-4d7a-92f0-46dd0d097659")
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

export const removeItem = (payload) => {
  return {
    type: REMOVE_CART_ITEM,
    payload,
  };
};

export const savePrice = (payload) => {
  return {
    type: SAVE_PRICE,
    payload,
  };
};
export const saveQty = (payload) => {
  return {
    type: SAVE_QTY,
    payload,
  };
};

export const addQty = (payload) => {
  return {
    type: ADD_QTY,
    payload,
  };
};

export const subQty = (payload) => {
  return {
    type: SUB_QTY,
    payload,
  };
};

export const getProductDetail = (payload) => {
  return {
    type: GET_PRODUCT_DETAIL,
    payload,
  };
};

export const grayedBody = (payload) => {
  return {
    type: GREY_FLAG,
    payload,
  };
};

export const convertCurrency = (payload) => {
  return {
    type: CURRENCY_CONVERTER,
    payload,
  };
};
