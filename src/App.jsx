import "./App.css";
import { useEffect, useState } from "react";

/* CEL:
 * Stworzenie prostej aplikacji, która pozwala użytkownikowi dodawać produkty do koszyka,
 * usuwać je oraz zaznaczać, które produkty zostały kupione.
 * Produkty kupione powinny być stylizowane inaczej niż te, które nadal są do kupienia.
 * 
 * !!! ! ! ! !!!
 * Produkty po odświeżeniu, czy zamknięciu okna nie znikają
 * !!! ! ! ! !!!
 */

function App() {
  // zmienne stanu
  const [newProdukt, setNewProdukt] = useState("");
  const [shoppingCart, setShoppingCart] = useState(() => {
    const saved = localStorage.getItem("shoppingCart");
    return saved ? JSON.parse(saved) : [];
  });
  const [message, setMessage] = useState("");

  //zapisywanie produktów lokalnie
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    setShoppingCart(savedCart);
  }, []);

  //wczytanie produktów z localStorage
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  // wykrycie zmiany w inpucie
  const handleChange = (event) => {
    setNewProdukt(event.target.value);
  };

  // dodanie produktu do koszyka
  const addProdukt = () => {
    // walidacja
    if(newProdukt === "") { setMessage("Nazwa produktu nie może być pusta!"); return; }
    // utworzenie obiektu produktu
    const produkt = {
      id:shoppingCart.length === 0 ? 1 : shoppingCart[shoppingCart.length-1].id+1,
        produktName:newProdukt,
        bought:false
      };
      // dodanie produktu do koszyka
    const newShoppingCart=[...shoppingCart, produkt];
    setShoppingCart(newShoppingCart);
    // wyczyszczenie inputa i komunikatu
    setMessage("");
    setNewProdukt("");
  };

  // usunięcie produktu z koszyka
  const deleteProdukt = (id) => {
    const confirmDelete = window.confirm("Czy jesteś pewien?");
    if (confirmDelete) {
      setShoppingCart(shoppingCart.filter((produkt) => produkt.id !== id));
    }
  }

  // zaznaczenie produktu jako kupionego
  const buyProdukt = (id) => {
    // mapowanie tablicy i zmiana właściwości bought na true dla wybranego produktu
    setShoppingCart(
      shoppingCart.map((produkt) => {
        if(produkt.id === id){
          return {...produkt, bought:true}
        } else {
          return produkt;
        }
      })
    );
  };

  // renderowanie komponentu
  return (
    <>
    {/* dodanie produktu */}
      <div className="addProdukt">
        <label>
          Wprowadź nazwę produktu: <input onChange={handleChange} value={newProdukt}/>
        </label>
          <button onClick={addProdukt}>Dodaj</button>
          <p className="message">{message}</p>
          <hr />
          <p>Ilość produktów: {shoppingCart.length}</p>
      </div>
    {/* wyświetlenie koszyka - najpierw do kupienia, na końcu kupione */}
      <div className="shoppingCart">
        {
          shoppingCart.slice() //operacja na kopii
          .sort((a, b) => a.bought - b.bought) //sortowanie wg bought
          .map((produkt) => ( //mapowanie i renderowanie
              <ProduktItem
              key={produkt.id}
              produktName={produkt.produktName}
              id={produkt.id}
              bought={produkt.bought}
              buyProdukt={buyProdukt}
              deleteProdukt={deleteProdukt}
              />
          ))}
      </div>
    </>
  );
}

// komponent produktu
const ProduktItem = (props) => {
  return (
    <div className="produkt">
      {/* cały produkt */}
      <div className="produktTitle" style={
        // zmiana koloru tła i tekstu w zależności od stanu bought
        {backgroundColor: 
          (props.bought ? "rgba(216, 228, 212, 1)" : "rgb(166, 231, 147)")}
        }>
        <p className="name" style={
          {color:
            (props.bought ? "rgb(170, 170, 170)" : "black")
          }
        }>
          {props.produktName}</p>
        </div>
        { /* przyciski akcji */ }
      <div className="produktButtons">
        <button onClick={()=>props.deleteProdukt(props.id)}>❌ Usuń</button>
        <button disabled={
          (props.bought ? true : false)
          } 
          onClick={
            ()=>props.buyProdukt(props.id)} >
          {props.bought ? "✔ Kupiono" : "🛒 Kup"}
        </button>
      </div>
    </div>
  );
}

export default App;
