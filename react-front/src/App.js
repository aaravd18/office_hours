import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./contexts/AuthContext";
import SignInPage from "./pages/SignInPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/note" Component={NotePage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/login" Component={SignInPage} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
