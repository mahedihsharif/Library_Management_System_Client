import App from "@/App";
import Books from "@/pages/Books";
import BorrowSummery from "@/pages/BorrowSummery";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/borrow-summery",
        element: <BorrowSummery />,
      },
    ],
  },
]);

export default router;
