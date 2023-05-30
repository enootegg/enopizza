import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./styles/Login.module.scss";
import { domain } from "utils/config";

const Login: NextPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      // await axios.post("http://localhost:3000/api/login", {
      await axios.post(`${domain}api/login`, {
        username,
        password,
      });
      router.push("/admin");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleClick}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
