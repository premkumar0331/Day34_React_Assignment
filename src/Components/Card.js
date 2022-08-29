import React from "react";
import Delete from "./Delete.js";

function Card(props) {
  return (
    <div>
      <h1 className="heading">Books Available</h1>
      <div className="container">
        {props.user.map((row) => {
          return (
            <div
              className="card"
              key={row.id}
              onClick={() => {
                props.onPopulatedData(row.id);
              }}
            >
              <div className="img-card">
                {/* <img src="" alt="Card1" /> */}
                <h1>{row.title}</h1>
              </div>
              <div className="content">
                <div>
                  <div className="content-heading">
                    <p>
                      Book Name :<strong>{row.title}</strong>
                    </p>
                  </div>
                  <div className="card_details">
                    <p>
                      Author :<strong>{row.author}</strong>
                    </p>
                    <p>
                      Publication :<b>{row.publication}</b>
                    </p>
                  </div>
                  <p>Description :{row.description}</p>
                </div>
              </div>
              <div className="card-price">
                <a href="/" className="button">
                  Buy: Rs.{row.price}
                </a>
                <button
                  type="button"
                  className="delete"
                  onClick={() => {
                    props.handleDelete(row.id);
                  }}
                >
                  <Delete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
