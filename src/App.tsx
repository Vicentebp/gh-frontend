import "./styles/App.css";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import AuthProvider from "./context/userContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Login></Login>
        <Tasks></Tasks>
      </AuthProvider>
    </>
  );
}

export default App;
