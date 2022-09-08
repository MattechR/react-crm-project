import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import SignUpBiz from "./components/signUpBiz";
import SignOut from "./components/signOut";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/auth.context";
import MyCards from "./components/myCards";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import DeleteCard from "./components/deleteCard";
import EditCard from "./components/editCard";

function App() {
  const a = useAuth();
  console.log(a);

  return (
    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer position="top-right" autoClose={5000} />
      <header>
        <Navbar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="my-cards/delete/:id"
            element={
              <ProtectedRoute bizOnly>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/edit/:id"
            element={
              <ProtectedRoute bizOnly>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards/create-card"
            element={
              <ProtectedRoute bizOnly>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute bizOnly>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="signUpBiz"
            element={<SignUpBiz redirect="my-cards/create-card" />}
          />
          <Route path="signUp" element={<SignUp redirect="/signIn" />} />
          <Route path="signIn" element={<SignIn redirect="/" />} />
          <Route path="signOut" element={<SignOut redirect="/" />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
