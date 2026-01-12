import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthContext, type AuthContextType } from "../context/userContext";
import createSha from "../utils/sha256";
import type { SignIn, User } from "../types";

interface FormInput {
  name?: string;
  email: string;
  password: string;
  passwordCheck: string;
}

function Login() {
  const [auth, setAuth] = useState<"login" | "signin">("login");
  const { signIn, login } = useContext(AuthContext) as AuthContextType;
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data: SignIn) => {
    if (auth === "signin") {
      if (data.password === data.passwordCheck) {
        const sha256 = await createSha(data.password);
        await signIn(data.name, data.email, sha256);
        setAuth("login");
        reset();
      } else alert("Senhas devem ser igual");
    } else {
      const sha256 = await createSha(data.password);
      login(data.email, sha256);
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          {auth === "signin" && (
            <>
              <label>Nome:</label>
              <input {...register("name")} required></input>
            </>
          )}
          <label>Email:</label>
          <input type="email" {...register("email")} required></input>
          <label>Senha:</label>
          <input type="password" {...register("password")} required></input>
          {auth === "signin" && (
            <>
              <label>Confirmar senha Senha:</label>
              <input type="password" {...register("passwordCheck")} required></input>
            </>
          )}
          <button type="submit">{auth === "signin" ? "Cadastrar" : "Logar"}</button>
          <button
            onClick={() => {
              setAuth(auth === "login" ? "signin" : "login");
            }}
          >
            {auth === "login" ? "SignIn" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
