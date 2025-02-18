import Hero from "./Hero";
import Navbar from "./components/Navbar";
import Products from "./Products";

function App() {
  return (
    <div>
      {/* <Navbar username={username} cartCount={cartCount}/> */}
      <Hero/>
      <Products/>
    </div>
  );
}

export default App;
