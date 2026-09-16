import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import { lazy } from "react";
import { Suspense } from "react";
import styled from "styled-components";

const FarmersPage = lazy(()=>import("../pages/FarmersPage"))
const ProductsPage = lazy(()=>import("../pages/ProductsPage"))

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 1.5rem;
  color: #1f3d2e;
  font-family: "Fraunces", serif;
`;

const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "farmers",
        element:(
          <Suspense fallback={<LoadingContainer>Loading...</LoadingContainer>}>
            <FarmersPage />
          </Suspense>
        ),

      },
      {
        path: "products",
       element:(
          <Suspense fallback={<LoadingContainer >Loading...</LoadingContainer>}>
            <ProductsPage />
          </Suspense>
        ),
      },
    ]
  },
]);

export default MyRouter;