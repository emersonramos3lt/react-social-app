import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Post } from "./PostList";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (error) {
    return <div> Error: {error.message} </div>;
  }
  return (
    <div className="w-[95%] md:max-w-[1200px] m-auto pt-10">
      <h2 className="text-2xl md:text-4xl mb-10 text-center">{data?.title}</h2>
      <img src={data?.image_url} alt={data?.title} className="w-full md:w-4/5 m-auto rounded-lg" />
      <p className="my-5">{data?.content}</p>
      <p className="text-gray-400">Posted on: {new Date(data!.created_at).toLocaleDateString()}</p>

      <LikeButton postId={postId} />
      <CommentSection postId={postId} />
    </div>
  );
};
