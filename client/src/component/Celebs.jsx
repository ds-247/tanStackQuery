import React, { useEffect } from "react";
import { useFetchCelebsQuery } from "../services/queries";

export default function Celebs() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCelebsQuery();

 

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error loading celebs</>;

  return (
    <div>
      <h1>Celebs</h1>
      <ol>
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((celeb) => (
              <li key={celeb.id}>
                <strong>{celeb.name}</strong>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ol>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No More Celebs"}
      </button>
    </div>
  );
}
