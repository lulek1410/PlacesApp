import React, { useEffect, useState } from "react";

import { ErrorModal } from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { UsersList } from "../components/UsersList";

export const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setData(response);
      } catch (error) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && data && <UsersList items={data} />}
    </>
  );
};
