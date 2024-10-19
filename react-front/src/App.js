import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./contexts/AuthContext";
import SignInPage from "./pages/SignInPage";
import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute Component={HomePage} />} />
          <Route path="/landing" Component={LandingPage} />
          <Route path="/note/:id" Component={NotePage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/login" Component={SignInPage} />
          <Route path="/test" Component={TestPage} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
