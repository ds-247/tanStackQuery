import Movie from "./component/Movie";
import Awards from "./component/Awards";
import { useIsFetching } from "@tanstack/react-query";

function App() {
  const isFetching = useIsFetching();
  
  return (
    <>
      <h3>Global active queries {isFetching}</h3>
      {/* <Movie /> */}
      <Awards />
    </>
  );
}

export default App;
