// ROUTER
import { WishlistProvider } from "../context/WishlistContext";
import Router from "../router/Router";

function App() {
  return (
    <WishlistProvider>
      <Router />
    </WishlistProvider>
  );
};

export default App;