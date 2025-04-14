import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
  return (
    <div>
        {" "}
        <h1 className="text-center text-2xl md:text-3xl my-10">Create New Post</h1>
        <CreatePost />
    </div>
  );
};
