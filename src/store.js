import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ============================================
        AXIOS INSTANCE FOR PRODUCTION
============================================ */
const api = axios.create({
  baseURL: "https://srifoodsbackend.vercel.app/api/v1/products", // ✅ FIXED
});

// Attach Token as Bearer <token>
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/* ========================= VEG PRODUCTS ========================= */
export const fetchVegProducts = createAsyncThunk(
  "veg/fetchVegProducts",
  async () => {
    const res = await api.get("/getVeg");
    return res.data.data || [];
  }
);

/* ========================= NONVEG PRODUCTS ========================= */
export const fetchNonvegProducts = createAsyncThunk(
  "nonveg/fetchNonvegProducts",
  async () => {
    const res = await api.get("/getNonveg");
    return res.data.data || [];
  }
);

/* ========================= PLACE ORDER ========================= */
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData) => {
    const res = await api.post("/placeOrder", orderData);
    return res.data;
  }
);

/* ========================= GET ORDERS ========================= */
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await api.get("/getOrders");
  return res.data.data || [];
});

/* ========================= LOGIN USER ========================= */
export const LoginUser = createAsyncThunk(
  "login/LoginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://srifoodsbackend.vercel.app/api/v1/products/login", // ✅ FIXED
        data
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data;
    } catch {
      return rejectWithValue("Invalid Email or Password");
    }
  }
);

/* ========================= VEG SLICE ========================= */
const vegSlice = createSlice({
  name: "veg",
  initialState: { vegItems: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.vegItems = action.payload;
      });
  },
});

/* ========================= NONVEG SLICE ========================= */
const nonvegSlice = createSlice({
  name: "nonveg",
  initialState: { nonvegItems: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNonvegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNonvegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nonvegItems = action.payload;
      });
  },
});

/* ========================= ORDERS SLICE ========================= */
const ordersSlice = createSlice({
  name: "orders",
  initialState: { orderList: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
      });
  },
});

/* ========================= CART SLICE ========================= */
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find((i) => i._id === item._id);
      if (exist) exist.quantity++;
      else state.items.push({ ...item, quantity: 1 });
    },
    increment: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity++;
    },
    decrement: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

/* ========================= COUPON SLICE ========================= */
const coupons = { SAVE10: 10, SAVE20: 20, SAVE30: 30 };

const couponSlice = createSlice({
  name: "coupon",
  initialState: { code: "", discount: 0, applied: false, message: "" },
  reducers: {
    applyCoupon: (state, action) => {
      const entered = action.payload.toUpperCase();
      if (coupons[entered]) {
        state.code = entered;
        state.discount = coupons[entered];
        state.applied = true;
        state.message = `${coupons[entered]}% Applied Successfully!`;
      } else {
        state.code = "";
        state.discount = 0;
        state.applied = false;
        state.message = "Invalid Coupon!";
      }
    },
    clearCoupon: (state) => {
      state.code = "";
      state.discount = 0;
      state.applied = false;
      state.message = "";
    },
  },
});

/* ========================= LOGIN SLICE ========================= */
const loginSlice = createSlice({
  name: "login",
  initialState: { loading: false, error: null, user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ========================= STORE ========================= */
const store = configureStore({
  reducer: {
    veg: vegSlice.reducer,
    nonveg: nonvegSlice.reducer,
    cart: cartSlice.reducer,
    coupon: couponSlice.reducer,
    orders: ordersSlice.reducer,
    login: loginSlice.reducer,
  },
});

export const { addToCart, increment, decrement, removeItem, clearCart } =
  cartSlice.actions;

export const { applyCoupon, clearCoupon } = couponSlice.actions;

export default store;
