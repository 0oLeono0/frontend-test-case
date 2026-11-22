import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  user: null,
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const index = state.cart.findIndex((item) => item.id === id);

      if (index === -1) return;

      if (quantity <= 0) {
        state.cart.splice(index, 1);
      } else {
        state.cart[index].quantity = quantity;
      }
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const selectProducts = (state) => state.app.products;
export const selectCart = (state) => state.app.cart;
export const selectUser = (state) => state.app.user;
export const selectLoading = (state) => state.app.loading;

export const selectCartCount = (state) =>
  selectCart(state).reduce((count, item) => count + item.quantity, 0);

export const selectTotalPrice = (state) =>
  selectCart(state).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const {
  setProducts,
  addToCart,
  removeFromCart,
  updateQuantity,
  setUser,
  setLoading,
  clearCart,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
