import React, { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import "./Login.css";

const ADMIN_EMAIL = "admin@pardoschicken.com";
const ADMIN_PASSWORD = "admin123";

export default function Login({ nav, onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      onLogin({ name: "Administrador", email: ADMIN_EMAIL, isAdmin: true });
      return;
    }

    if (normalizedEmail === ADMIN_EMAIL && pass !== ADMIN_PASSWORD) {
      setError("Contraseña incorrecta para la cuenta de administrador.");
      return;
    }

    onLogin({ name: email ? email.split("@")[0] : "Manuel Huanaco", email: email || "waltermanuelhuanaco212@gmail.com", isAdmin: false });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">¡Bienvenido a Pardos Chicken!</h1>

        <label className="login-label">Correo electrónico</label>
        <input
          className="login-input"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="tucorreo@ejemplo.com"
        />

        <label className="login-label">Contraseña</label>
        <div className="login-pass-wrap">
          <input
            className="login-pass-input"
            type={show ? "text" : "password"}
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(""); }}
          />
          <button className="login-pass-toggle" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <p className="login-error">{error}</p>}
        <p className="login-forgot-wrap">
          <button className="login-forgot">Recuperar contraseña</button>
        </p>

        <button className="login-submit" onClick={handleSubmit}>
          Ingresar
        </button>

        <p className="login-guest-wrap">
          <button className="login-guest" onClick={() => nav("home")}>
            <User size={13} /> Continuar como invitado
          </button>
        </p>

        <div className="login-divider">
          <div className="login-divider-line" />
          <span className="login-divider-text">ó</span>
          <div className="login-divider-line" />
        </div>

        <button className="login-google" onClick={() => onLogin({ name: "Manuel Huanaco", email: "waltermanuelhuanaco212@gmail.com", isAdmin: false })}>
          <span className="login-google-g">G</span> Ingresar con Google
        </button>

        <p className="login-terms">
          Al ingresar con Google, aceptas nuestros{" "}
          <span>términos y condiciones</span> y{" "}
          <span>políticas de privacidad.</span>
        </p>

        <p className="login-signup">
          ¿No tienes una cuenta?{" "}
          <button className="login-signup-link" onClick={() => onLogin({ name: "Manuel Huanaco", email: "waltermanuelhuanaco212@gmail.com", isAdmin: false })}>
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
