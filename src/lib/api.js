import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: "https://fed-storefront-backend-charith.onrender.com/api/" }),

  prepareHeaders: async (headers, { getState }) => {
    const token = await window.Clerk?.session?.getToken();
    console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
    }),
  }),
})
export const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new error("Error while loading Products");
  }
};

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useCreateProductMutation,
  useGetOrderQuery,
} = Api;

