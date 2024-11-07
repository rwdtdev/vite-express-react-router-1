import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Contact from "./routes/root/contacts/[id]/Contact.tsx";
import Root from "./routes/root/Sidebar.tsx";
import {
  createContact,
  deleteContactById,
  getContactById,
  getContacts,
  updContact,
  updContactFavorite,
} from "./actions/createContact.ts";
import EditContact from "./routes/root/contacts/[id]/edit/EditContact.tsx";
import Index from "./routes/root/index.tsx";

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
          { path: "/contacts", element: <Navigate to="/" /> },
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
