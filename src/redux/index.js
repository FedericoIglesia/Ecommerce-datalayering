import {
  ADD_TO_CART,
  FILTER_BY_CATEGORY,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  GET_PRODUCT_DETAIL,
} from "./actions";

const initialState = {
  products: [],
  initialProducts: [],
  cartItems: [],
  currentDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
        initialProducts: state.products.filter((p) => p.category === "women"),
      };

    case FILTER_BY_CATEGORY:
      console.log("REDUCER   " + action.payload);
      const allProducts = state.products;
      const filteredProducts = allProducts.filter(
        (p) => p.category === action.payload
      );
      return {
        ...state,
        initialProducts: filteredProducts,
      };

    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: [...action.payload],
      };

    case GET_PRODUCT_DETAIL:
      const allProds = state.products;
      const detailId = allProds.find(
        (product) => product.id === action.payload
      );
      // console.log("REDUCEEER " + detailId.productName);
      return {
        ...state,
        currentDetail: detailId,
      };

    default:
      return state;
  }
};

export default rootReducer;
