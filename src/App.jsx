import Hero from "./Hero";
import Navbar from "./Navbar";
import Products from "./Products";


function App() {

  const cartCount=0;
  const username="Charith";
  
  return (
    <div>
      <Navbar username={username} cartCount={cartCount}/>
      <Hero/>
      <Products/>
    </div>
  );
}

export default App;
