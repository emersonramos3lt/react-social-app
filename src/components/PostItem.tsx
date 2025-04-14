import { Link } from "react-router";
import { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="group my-10">
      <Link to={`/post/${post.id}`} className="block z-10">
        <div className="w-80 h-76 bg-zinc-900 border border-zinc-500 rounded-lg text-white flex flex-col p-5 overflow-hidden group-hover:bg-zinc-800 hover:scale-95 transition duration-300">
          {/* HEADER: AVATAR/TITLE */}
          <div className="flex items-center space-x-2">
            {post.avatar_url ? (
              <img src={post.avatar_url} alt="User avatar" className="w-[35px] h-[35px] rounded-full object-cover" />
            ) : (
              <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-tl bg-neutral-200" />
            )}
            <div className="flex flex-col flex-1">
              <div className="text-[20px] leading-[22px] font-semibold mt-2">
                {post.title}
              </div>
            </div>
          </div>

          {/* BANNER */}
          <div className="mt-2 flex-1">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-lg object-cover max-h-[150px] mx-auto"
            />
          </div>
          <div className="flex justify-around items-center">
            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg"></span>
            <span className="cursor-pointer h-10 w-[50px] px-1 flex items-center justify-center font-extrabold rounded-lg"></span>
          </div>
        </div>
      </Link>
    </div>
  );
};
