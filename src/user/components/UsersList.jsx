import React from "react";

import "./UsersList.css";
import { UserItem } from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

export const UsersList = (props) => {
  return props.items.length ? (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  ) : (
    <div className="center">
      <Card>
        <h1>No users found.</h1>
      </Card>
    </div>
  );
};
