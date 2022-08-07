import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from 'react-query'

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {

  const { data, isError, isLoading, isFetched, hasNextPage, fetchNextPage } = useInfiniteQuery("sw-species", ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastPage) => lastPage.next || undefined
  })

  // TODO: get data for InfiniteScroll via React Query
  if (isLoading) return <h3>Loading...</h3>

  return <>
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
      {data?.pages.map(page => page.results.map(e => <Species language={e.language} averageLifespan={e.average_lifespan} />))}
    </InfiniteScroll>
  </>;
}
