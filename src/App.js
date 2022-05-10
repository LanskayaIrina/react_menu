import { useState } from "react";
import { CartProvider } from "./store/CartProvider";
import { Header } from "./components/Layout/Header/Header";
import { Meals } from "./components/Meals/Meals";
import { Cart } from "./components/Cart/Cart";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={() => setCartIsShown(false)} />}
      <Header onOpenCart={() => setCartIsShown(true)} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
