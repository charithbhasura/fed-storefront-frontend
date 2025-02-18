import Hero from "./Hero";
import Navbar from "./components/Navbar";
import Products from "./Products";


function App() {
/**
  const cartCount=0;
  const username="";
*/
  
  return (
    <div>
      <Navbar username={username} cartCount={cartCount}/>
      <Hero/>
      <Products/>
    </div>
  );
}

export default App;
