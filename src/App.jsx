import Hero from "./Hero";
import Navbar from "./Navbar";

function App() {

  const cartCount=0;
  const username="Charith";
  
  return (
    <div>
      <Navbar username={username} cartCount={cartCount}/>
      <Hero/>
    </div>
  );
}

export default App;
