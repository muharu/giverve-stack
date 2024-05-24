import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./libs/rpc";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const fetchHello = async () => {
      const response = await api.hello.$get({
        query: {
          name: "Muharu",
        },
      });
      const { message } = await response.json();
      setData(message);
    };
    fetchHello();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
        <a href="https://hono.dev" target="_blank">
          <img src="/hono.svg" className="logo react" alt="React logo" />
        </a>
        <a href="https://bun.sh" target="_blank">
          <img src="/bun.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Hono + Bun</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Fetch from backend: {data}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
