import { useEffect, useState } from "react";
import http from "./services/api"

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await http.get();
      setData(resp);
    }  
    
    fetchData();
  } , [])
  return <>{JSON.stringify(data)}</>;
}

export default App;
