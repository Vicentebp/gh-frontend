import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/userContext";
import createSha from "../utils/sha256";

interface FormInput {
  name?: string;
  email: string;
  password: string;
  passwordCheck: string;
}

function Login() {
  const [auth, setAuth] = useState<"login" | "signin">("login");
  const { user, signIn, login } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
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
      <button
        onClick={() => {
          setAuth(auth === "login" ? "signin" : "login");
        }}
      >
        {auth === "login" ? "SignIn" : "Login"}
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 text-black">
          {auth === "signin" && (
            <>
              <label>Nome:</label>
              <input className="bg-white" {...register("name")}></input>
            </>
          )}
          <label>Email:</label>
          <input className="bg-white" type="email" {...register("email")}></input>
          <label>Senha:</label>
          <input className="bg-white" type="password" {...register("password")}></input>
          {auth === "signin" && (
            <>
              <label>Confirmar senha Senha:</label>
              <input className="bg-white" type="password" {...register("passwordCheck")}></input>
            </>
          )}
          <button type="submit">{auth === "signin" ? "Cadastrar" : "Logar"}</button>
        </div>
      </form>
    </>
  );
}

export default Login;
