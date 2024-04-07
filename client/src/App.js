import "./App.css";

// imports componnts
import Header from "./components/layouts/Header";

import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { useEffect, useState } from "react";
import axios from "axios";
// Store
import store from "./store";
import { loadUser } from "./actions/userAction";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loadUser);
    
  }, []);
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <Toaster position="bottom-center" />
          <AnimatedRoutes />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
