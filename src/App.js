import { Header } from './components/Header/HeaderComp';
import { Card } from './components/Card/CardComp';
import { Drawer } from './components/Drawer/DrawerComp';
import search from './assets/img/search.svg';

const arr = [
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    imageUrl: "https://github.com/Kori-si/react-sneakers/blob/master/public/img/sneakers/1.jpg?raw=true"
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 12999,
    imageUrl: "https://github.com/Kori-si/react-sneakers/blob/master/public/img/sneakers/2.jpg?raw=true"
  },
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    imageUrl: "https://github.com/Kori-si/react-sneakers/blob/master/public/img/sneakers/3.jpg?raw=true"
  },
  {
    title: "Кроссовки Puma X Aka Boku Future Rider",
    price: 8999,
    imageUrl: "https://github.com/Kori-si/react-sneakers/blob/master/public/img/sneakers/4.jpg?raw=true"
  },
];

function App() {
  return (
    <div className='wrapper clear'>

      <Drawer />
      <Header />

      <div className='content p-40'>
        <div className='d-flex align-center mb-40 justify-between'>
          <h1>Все кроссовки</h1>
          <div className='search-block d-flex'>
            <img src={search} alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClick={() => console.log(obj)}
            />
          ))}

        </div>
      </div>
    </div>

  );
}

export default App;

