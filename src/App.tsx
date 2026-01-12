import "./styles/App.css";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import AuthProvider from "./context/userContext";
import { Route, Routes } from "react-router";
import TaskProvider from "./context/taskContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/tasks" element={<Tasks />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </>
  );
}

export default App;
