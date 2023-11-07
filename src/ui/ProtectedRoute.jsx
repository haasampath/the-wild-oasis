import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.load the uauthenticated user
  const { isLoading, isAuthenticated } = useUser();
  //2. if there is no authenticated user, redirectes to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading]
  );

  //3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4.    if there is a UserActivation, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
