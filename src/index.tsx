import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { cartItemsVar } from "./cache";

const client = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache({
    typePolicies: {
      // Type policy map
      Product: {
        fields: {
          cartItems: {
            read() {
              console.log("cartItems read called:", cartItemsVar());
              return cartItemsVar();
            },
          },
          // Field policy map for the Product type
          isInCart: {
            // Field policy for the isInCart field
            read(_, { variables }) {
              // The read function for the isInCart field
              return null; //localStorage.getItem("CART").includes(variables.productId);
            },
          },
        },
      },
    },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
