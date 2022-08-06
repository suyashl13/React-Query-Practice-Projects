import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from 'react-query'
import { PostDetail } from "./PostDetail";



const maxPostPage = 10;



async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient()

  useEffect(() => {
    if (currentPage <= maxPostPage) {
      queryClient.prefetchQuery(["posts", currentPage + 1], () => fetchPosts(currentPage + 1));
    }
  }, [currentPage, queryClient])


  // replace with useQuery
  const { data, isLoading, isError } = useQuery(["posts", currentPage], () => fetchPosts(currentPage), { staleTime: 2000, keepPreviousData: true });


  if (isError) return <h1>Error</h1>;
  if (isLoading) return <h1>Is Loading...</h1>;
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => {
          setCurrentPage((prev) => prev - 1)
        }}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled={currentPage >= 100} onClick={() => {
          setCurrentPage((prev) => prev + 1)
        }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
