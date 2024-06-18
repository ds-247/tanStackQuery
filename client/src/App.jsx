import Movie from "./component/Movie";
import Awards from "./component/Awards";
import { useIsFetching } from "@tanstack/react-query";
import Celebs from "./component/Celebs";

function App() {
  const isFetching = useIsFetching();
  
  return (
    <>
      <h3>Global active queries {isFetching}</h3>
      {/* <Movie /> */}
      {/* <Awards /> */}
      <Celebs />
    </>
  );
}

export default App;
