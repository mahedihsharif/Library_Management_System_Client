import {
  type ApiResponse,
  type IBook,
  type IBookCreate,
  type IBookSummary,
  type IBorrow,
  type ICreateBorrowArg,
  type IError,
} from "@/type";
import { type SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    // baseUrl: "https://library-management-system-six-dusky.vercel.app/api",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<IBook[]>, void>({
      query: () => "/books",
      providesTags: ["book"],
    }),
    getBook: builder.query<ApiResponse<IBook>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "book", id }],
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
      invalidatesTags: (_result, _error, arg) => [
        { type: "book", id: arg.id },
        "book",
      ],
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

//error handling for creating or updating data with type guard
export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const typedError = error as FetchBaseQueryError & IError;

    if (
      typedError.data &&
      typeof typedError.data === "object" &&
      typeof typedError.data.message === "string"
    ) {
      return typedError.data.message;
    }
  }

  return "Something went wrong";
}

//error handling for read data with type guard
export const getErrorMessageToReadData = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ("status" in error) {
    const data = error.data as { message?: string };
    return data?.message || `Request failed with status ${error.status}`;
  } else if ("message" in error) {
    return error.message || "An unknown error occurred";
  }
  return "Something went wrong";
};
