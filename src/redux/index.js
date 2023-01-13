import {
  ADD_QTY,
  ADD_TO_CART,
  FILTER_BY_CATEGORY,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  GET_PRODUCT_DETAIL,
  GREY_FLAG,
  REMOVE_CART_ITEM,
  SAVE_PRICE,
  SAVE_QTY,
} from "./actions";

import Swal from "sweetalert2";

// let a = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  products: [],
  initialProducts: [],
  currentDetail: {},
  cartItems: [JSON.parse(localStorage.getItem("cart"))] || [],
  flag: false,
  qty: [1],
  totalPrice: 0,
};

console.log(initialState.cartItems);
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

    // case GET_CART_ITEMS:
    //   return {
    //     ...state,
    //     cartItems: [...action.payload],
    //   };

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
    case ADD_TO_CART:
      const prods = state.products;
      const cart = state.cartItems;
      const id = action.payload;
      const item = prods.filter((i) => i.id === id);
      let newLength = state.qty;

      newLength.push(1);

      if (cart.some((c) => c.id === id)) {
        Swal.fire({
          title: "You already have this item in the cart!",
          text: "Please change the quantity to order from the cart",
          icon: "Error",
          confirmButtonText: "Back",
        });

        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item].flat(),
          qty: [...newLength],
        };
      }

    case REMOVE_CART_ITEM:
      let idx = action.payload;
      let newArr = [...state.cartItems];
      newArr.splice(idx, 1);
      let qtyArr = [...state.qty];
      qtyArr.splice(idx, 1);

      return {
        ...state,
        cartItems: newArr,
        qty: qtyArr,
      };

    // case GREY_FLAG:
    //   console.log("flag => " + action.payload);
    //   return {
    //     ...state,
    //     flag: action.payload,
    //   };

    case SAVE_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case SAVE_QTY:
      return {
        ...state,
        qty: action.payload,
      };
    case ADD_QTY:
      let newQty = [...state.qty];
      newQty.push(1);
      return {
        ...state,
        qty: newQty,
      };
    default:
      return state;
  }
};

export default rootReducer;