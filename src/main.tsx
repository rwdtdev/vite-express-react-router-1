import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Contact from "./routes/contact.tsx";
import Root from "./routes/root";
import EditContact from "./routes/edit.tsx";
import Index from "./routes/index.tsx";
import {
  createContact,
  deleteContactById,
  getContactById,
  getContacts,
  updContact,
  updContactFavorite,
} from "./actions/createContact.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getContacts,
    action: createContact,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: getContactById,
            action: updContactFavorite,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactById,
            action: updContact,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteContactById,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
