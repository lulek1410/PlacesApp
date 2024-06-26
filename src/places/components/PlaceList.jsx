import React from "react";

import { PlaceItem } from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";

import "./PlaceList.css";
import Button from "../../shared/FormElements/Button";

export const PlaceList = (props) => {
  return props.items.length === 0 ? (
    <div className="place-list center">
      <Card>
        <h2>No places found. Maybe create one?</h2>
        <Button to="/places/new">Share Place</Button>
      </Card>
    </div>
  ) : (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}{" "}
    </ul>
  );
};
