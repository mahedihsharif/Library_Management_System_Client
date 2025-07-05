import {
  type ApiResponse,
  type IBook,
  type IBookCreate,
  type IBookSummary,
  type IBorrow,
  type ICreateBorrowArg,
  type IError,
} from "@/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-six-dusky.vercel.app/api",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["book"],
    }),
    getBook: builder.query<ApiResponse<IBook>, string>({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation<ApiResponse<IBook>, IBookCreate, IError>({
      query: (bookData) => ({
        url: "/create-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation<
      ApiResponse<IBook>,
      { id: string; updatedBookData: Partial<IBook> }
    >({
      query: ({ id, updatedBookData }) => ({
        url: `/edit-book/${id}`,
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
    //borrow api request phase
    createBorrowBook: builder.mutation<ApiResponse<IBorrow>, ICreateBorrowArg>({
      query: ({ bookId, borrowBookData }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: borrowBookData,
      }),
      invalidatesTags: ["book"],
    }),

    getBorrowBooks: builder.query<ApiResponse<IBookSummary[]>, void>({
      query: () => "/borrow-summary",
      providesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowBookMutation,
  useGetBorrowBooksQuery,
} = baseApi;
