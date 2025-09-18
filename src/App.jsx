import "./App.css";
import { useState } from "react";

/* CEL:
 * Stworzenie prostej aplikacji, która pozwala użytkownikowi dodawać produkty do koszyka,
 * usuwać je oraz zaznaczać, które produkty zostały kupione.
 * Produkty kupione powinny być stylizowane inaczej niż te, które nadal są do kupienia.
 */

function App() {
  const [newProdukt, setNewProdukt] = useState("");
  const [shoppingCart, setShoppingCart] = useState([]);
  const AddProdukt = (produktName) => {};

  const handleChange = (event) => {
    setNewProdukt(event.target.value);
  };

  const addProdukt = () => {
    const newShoppingCart = [...shoppingCart, newProdukt];
    setShoppingCart(newShoppingCart);
  };
  return (
    <>
      <div className="addProduct">
        <label>
          Wprowadź nazwę produktu: <input onChange={handleChange} />
        </label>
        <button onClick={addProdukt}>Dodaj</button>
      </div>
    </>
  );
}

export default App;
