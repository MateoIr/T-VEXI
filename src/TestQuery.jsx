import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/users";

const TestQuery = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  if (postsQuery.status === "pending") console.log(postsQuery.data);
  if (postsQuery.status === "success") {
    return (
      <>
        <div>
          <h1>Posts List 1</h1>
          <ol>
            {postsQuery.data.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ol>
        </div>
      </>
    );
  }
};

export default TestQuery;
