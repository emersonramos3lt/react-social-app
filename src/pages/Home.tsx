import { PostList } from "../components/PostList";

export const Home = () => {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl my-10">Recent Posts</h1>
      <div>
        <PostList />
      </div>
    </div>
  );
};
