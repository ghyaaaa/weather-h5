import { useEffect } from "react";
import { searchWeather } from "./api/apis";
import "./App.css";

function App() {
  const getApi = async () => {
    const res = await searchWeather({
      city: 110000,
      extensions: "all",
    });

    console.log("data", res.data);
    document.writeln(`Response : ${JSON.stringify(res.data)}`);
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div>app</div>
    </>
  );
}

export default App;
