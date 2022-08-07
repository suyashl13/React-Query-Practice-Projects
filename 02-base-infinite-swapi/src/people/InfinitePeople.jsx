import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";


const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery("sw-people", ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  );

  // TODO: get data for InfiniteScroll via React Query

  if (isLoading) return <h3>Loading...</h3>

  return <>
    {isFetching ? "Fetching" : null}
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
      {data.pages.map(pageData => {
        return pageData.results.map((person, k) => <Person name={person.name} key={k} hairColor={person.hair_color} eyeColor={person.eye_color} />)
      })}
    </InfiniteScroll></>;
}
