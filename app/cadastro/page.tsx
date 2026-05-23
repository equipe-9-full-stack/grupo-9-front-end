"use client";
import api from "../services/api";
import { useState } from "react";

export default function CadastrePage() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
   
  const createCadastro = async () => {
  try {
    const response = await api.post("/usuarios", {
      nome: nome,
      username: username,
      email: email,
      senha_hash: senha,
    });

    console.log("Cadastro criado:", response.data);
  } catch (error) {
    console.error("Erro ao criar cadastro:", error);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0ede3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Arial Black', Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "80px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Card de cadastro */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "24px",
            padding: "48px 40px",
            width: "100%",
            maxWidth: "400px",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              color: "#f0ede3",
              fontSize: "22px",
              fontWeight: 900,
              letterSpacing: "2px",
              textAlign: "center",
              marginBottom: "32px",
              textTransform: "uppercase",
            }}
          >
            CRIE SUA CONTA
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="Nome Completo"
              value={nome}
  onChange={(e) => setNome(e.target.value)}
              style={{
                backgroundColor: "#f0ede3",
                border: "none",
                borderRadius: "999px",
                padding: "14px 20px",
                fontSize: "14px",
                color: "#555",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
  onChange={(e) => setUsername(e.target.value)}
              style={{
                backgroundColor: "#f0ede3",
                border: "none",
                borderRadius: "999px",
                padding: "14px 20px",
                fontSize: "14px",
                color: "#555",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: "#f0ede3",
                border: "none",
                borderRadius: "999px",
                padding: "14px 20px",
                fontSize: "14px",
                color: "#555",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            {/* Senha */}
            <div style={{ position: "relative" }}>
              <input
                type={showSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{
                  backgroundColor: "#f0ede3",
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px 44px 14px 20px",
                  fontSize: "14px",
                  color: "#555",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={() => setShowSenha(!showSenha)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#888",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showSenha ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Confirmar Senha */}
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmar ? "text" : "password"}
                placeholder="Confirmar Senha"
                style={{
                  backgroundColor: "#e8e4d9",
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px 44px 14px 20px",
                  fontSize: "14px",
                  color: "#555",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={() => setShowConfirmar(!showConfirmar)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "#888",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showConfirmar ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={createCadastro}
            style={{
              marginTop: "24px",
              width: "100%",
              backgroundColor: "#7c3aed",
              color: "#bbb6b6",
              border: "none",
              borderRadius: "999px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
          >
            CADASTRAR
          </button>

          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "13px",
              color: "#aaa",
            }}
          >
            Já possui uma conta?{" "}
            <a
              href="/login"
              style={{
                color: "#7c3aed",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </p>
        </div>

        {/* Lado direito: logo + mascote */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            flexShrink: 0,
          }}
        >

          {/* Mascote  */}
          <img
            src="/Mascote.png"
            alt="Mascote Stock.io"
            style={{ width: "250px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}