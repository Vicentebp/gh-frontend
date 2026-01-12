import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../context/userContext";

function LogOut() {
  const { logOut } = useContext(AuthContext) as AuthContextType;

  return (
    <>
      <button onClick={() => logOut()}>Logout</button>
    </>
  );
}

export default LogOut;
