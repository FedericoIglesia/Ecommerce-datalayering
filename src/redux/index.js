import {
  ADD_QTY,
  ADD_TO_CART,
  CURRENCY_CONVERTER,
  FILTER_BY_CATEGORY,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  GET_PRODUCT_DETAIL,
  GREY_FLAG,
  REMOVE_CART_ITEM,
  SAVE_PRICE,
  SAVE_QTY,
  SUB_QTY,
} from "./actions";

import Swal from "sweetalert2";

// let a = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  products: [],
  initialProducts: [],
  currentDetail: {},
  cartItems: [],
  flag: false,
  qty: [1],
  totalPrice: 0,
  JPYselected: false,
  EURselected: false,
  USDselected: true,
  conversionRate: 1,
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

      return {
        ...state,
        currentDetail: detailId,
      };
    case ADD_TO_CART:
      const prods = state.products;
      let cart = state.cartItems;
      let id = action.payload;
      let item = prods.filter((i) => i.id === id);
      let newLength = state.qty;
      item[0]["qty"] = 1;
      newLength.push(1);
      console.log(cart);

      if (cart.some((c) => c.id === id)) {
        // Swal.fire({
        //   title: "You already have this item in the cart!",
        //   text: "Please change the quantity to order from the cart",
        //   icon: "Error",
        //   confirmButtonText: "Back",
        // });
        // cart[id].qty = cart[id].qty + 1;

        return {
          ...state,
        };
      } else {
        console.log(state.cartItems);
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

    case GREY_FLAG:
      return {
        ...state,
        flag: action.payload,
      };

    case SAVE_PRICE:
      let itemPrice = action.payload;

      return {
        ...state,
        totalPrice: action.payload,
      };

    case SAVE_QTY:
      return {
        ...state,
        qty: [...action.payload],
      };
    case ADD_QTY:
      let index = action.payload;
      let sum1 = state.cartItems;
      sum1[index].qty = sum1[index].qty + 1;
      let newQ = sum1.map((a) => a.qty);

      return {
        ...state,
        cartItems: sum1,
        qty: newQ,
      };

    case SUB_QTY:
      let subIdx = action.paylod;
      let sub1 = state.cartItems;
      if (sub1[action.payload].qty > 1) {
        sub1[action.payload].qty = sub1[action.payload].qty - 1;
      } else {
        sub1.splice(action.payload, 1);
      }

      let newQs = sub1.map((a) => a.qty);
      return {
        ...state,
        cartItems: sub1,
        qty: newQs,
      };

    //since only 3 currencies are needed in this mock, i chose to do a manual conversion setup instead of consuming an external API, however it is important to note that floating point errors natural to this calculations could accumulate and reflect innacuracies in the final conversion overtime.
    case CURRENCY_CONVERTER:
      let convertedProds = state.initialProducts.map((i) => ({
        ...i,
        initialPrice: i.price,
      }));
      let convertedCart = state.cartItems.map((i) => ({
        ...i,
        initialPrice: i.price,
      }));
      let currentRate = 1;
      if (action.payload == "eur") {
        if (state.USDselected) {
          currentRate = 0.9234;
          convertedProds = convertedProds.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          convertedCart = convertedCart.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          return {
            ...state,
            initialProducts: convertedProds,
            EURselected: true,
            USDselected: false,
            conversionRate: currentRate,
            cartItems: convertedCart,
          };
        } else if (state.JPYselected) {
          currentRate = 0.0072;
          convertedProds = convertedProds.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);
            return newObj;
          });
          convertedCart = convertedCart.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          return {
            ...state,
            initialProducts: convertedProds,
            EURselected: true,
            JPYselected: false,
            conversionRate: currentRate,
            cartItems: convertedCart,
          };
        } else {
          return {
            ...state,
          };
        }
      } else if (action.payload == "jpy") {
        if (state.USDselected) {
          currentRate = 128.3411;
          convertedProds = convertedProds.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);
            return newObj;
          });
          convertedCart = convertedCart.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          return {
            ...state,
            initialProducts: convertedProds,
            JPYselected: true,
            USDselected: false,
            conversionRate: currentRate,
            cartItems: convertedCart,
          };
        } else if (state.EURselected) {
          currentRate = 139.0211;
          convertedProds = convertedProds.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);
            return newObj;
          });
          convertedCart = convertedCart.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          return {
            ...state,
            initialProducts: convertedProds,
            JPYselected: true,
            EURselected: false,
            conversionRate: currentRate,
            cartItems: convertedCart,
          };
        } else {
          return {
            ...state,
          };
        }
      } else {
        if (state.EURselected) {
          currentRate = 1.0829;
          convertedProds = convertedProds.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);
            return newObj;
          });
          convertedCart = convertedCart.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          return {
            ...state,
            initialProducts: convertedProds,
            USDselected: true,
            EURselected: false,
            conversionRate: currentRate,
            cartItems: convertedCart,
          };
        } else if (state.JPYselected) {
          currentRate = 0.0079;
          convertedProds = convertedProds.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);
            return newObj;
          });
          convertedCart = convertedCart.map((i) => {
            let newObj = { ...i };
            newObj.price = parseFloat(
              parseFloat(newObj.initialPrice) * currentRate
            ).toFixed(2);

            return newObj;
          });
          return {
            ...state,
            initialProducts: convertedProds,
            USDselected: true,
            JPYselected: false,
            cartItems: convertedCart,
          };
        } else {
          return {
            ...state,
          };
        }
      }

    default:
      return state;
  }
};

export default rootReducer;
