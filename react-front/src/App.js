import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotePage from "./pages/NotePage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./contexts/AuthContext";
import LogInPage from "./pages/LogInPage";
import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import ExamPage from "./pages/ExamPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute Component={HomePage} />} />
          <Route
            path="/exam/:id"
            element={<PrivateRoute Component={ExamPage} />}
          />
          <Route
            path="/note/:id"
            element={<PrivateRoute Component={NotePage} />}
          />
          <Route path="/landing" Component={LandingPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/login" Component={LogInPage} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
