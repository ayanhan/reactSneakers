import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
  {
    name: "Men's Nike Blazer Mid Suede",
    price: `180$`,
    imageUrl: "/img/sneakers/1.jpg",
  },
  {
    name: "Men's Nike Air Max 270",
    price: `150$`,
    imageUrl: "/img/sneakers/2.jpg",
  },
  {
    name: "Men's Nike Blazer Mid Suede",
    price: `120$`,
    imageUrl: "/img/sneakers/3.jpg",
  },
  {
    name: "Men's Puma X Aka Boku Future Rider",
    price: `130$`,
    imageUrl: "/img/sneakers/4.jpg",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />

      <Header />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card name={obj.name} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
