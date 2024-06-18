import { useState } from "react";
import { useAwardsQuery } from "../services/queries";

export default function Awards() {
  const [page, setPage] = useState(1);

  const {  isPending, error, isError, isFetching, data, isPlaceholderData } = useAwardsQuery(page);
  console.log(data);

  if (isError) return <> Error Fetching Data</>;
  

  return (
    <>
      <h1> Awards</h1>
      {isPending ? (
        <div>Loading</div>
      ) : isError ? (
        <div> Error : {error.message}</div>
      ) : (
        <ul>
          {data.map((award) => (
            <li key={award.id}>
              <em>{award.id}</em>
              <strong> {award.name}</strong>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        prev
      </button>
      current page  :  {page}
      <button onClick={() => {
        if(!isPlaceholderData){
            setPage((prev) => prev + 1);
        }
      }}
      disabled={isPlaceholderData} >next</button>
      <br/>
      {isFetching ? "fetching " : "not fetching "}
    </>
  );
}
