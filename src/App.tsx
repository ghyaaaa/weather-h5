import { Header, WeatherBody } from "./component";
import Style from "./App.module.less";

function App() {
  return (
    <div className={Style.layout}>
      <Header />
      <WeatherBody />
    </div>
  );
}

export default App;
