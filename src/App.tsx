import { useQuery, gql } from "@apollo/client";
import { AddToCartButton } from "./AddToCartButton";
import { Cart } from "./Cart";

const GET_LOCATIONS = gql`
  query GetLocations {
    cartItems @client
    isInCart @client # This is a local-only field
    locations {
      id
      name
      description
      photo
    }
  }
`;

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log("DisplayLocatoins data.cartItems =", data.cartItems);
  console.log("DisplayLocatoins data.isInCart =", data.isInCart);
  return data.locations.map(({ id, name, description, photo }: any) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <AddToCartButton productId={20} />
      <Cart />
    </div>
  );
}
