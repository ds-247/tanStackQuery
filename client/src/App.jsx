import Movie from "./component/Movie";
import { useIsFetching } from "@tanstack/react-query";

function App() {
  const isFetching = useIsFetching();
  
  return (
    <>
      <h3>Global active queries {isFetching}</h3>
      <Movie />
    </>
  );
}

export default App;
