import { type ApiResponse, type IBook, type IBookCreate } from "@/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["book"],
    }),
    createBook: builder.mutation<IBook, IBookCreate>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, ...updatedBookData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedBookData,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = baseApi;
