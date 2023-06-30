import { useEffect } from "react";
import { searchWeather } from "./api/apis";
import Style from "./App.module.less";

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
      <div className={Style.app}>app</div>
    </>
  );
}

export default App;
