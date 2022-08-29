import React from "react";
import "./Card.css";
import Card from "./Card";

export default function Bookslist(props) {
  return (
    <div>
      <Card
        user={props.user}
        handleDelete={(id) => {
          props.handleDelete(id);
        }}
        onPopulatedData={(id) => {
          props.onPopulatedData(id);
        }}
      />
    </div>
  );
}

