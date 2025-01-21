
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; //to handle routing in react and wrap the App component with BrowserRouter
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(

    <CaptainContext>
      <UserContext>
        <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainContext>

);
