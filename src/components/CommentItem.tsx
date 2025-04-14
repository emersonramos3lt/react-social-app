import { useState } from "react";
import { Comment } from "./CommentSection";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  comment: Comment & {
    children?: Comment[];
  };
  postId: number;
}

const createReply = async (
  replyContent: string,
  postId: number,
  parentCommentId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("You must log in.");
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parentCommentId,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

export const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (replyContent: string) =>
      createReply(
        replyContent,
        postId,
        comment.id,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setShowReply(false);
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyText) return;

    mutate(replyText);
  };

  return (
    <div className="border-l border-gray-500 pl-2 my-12">
      <div> 
        <div className="flex gap-4">
          {/* COMMENTERS USERNAME */}
          <span className="font-bold text-blue-500">{comment.author}</span>
          {/* SHOW DATE */}
          <span className="text-gray-500 text-sm">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <p>{comment.content}</p>
        <button
          className="my-2 text-blue-500 font-bold"
          onClick={() => setShowReply((prev) => !prev)}
        >
          {showReply ? (
            <img src="/cancel.svg" alt="Reply" className="w-5 h-5" />
          ) : (
            <img src="/reply.svg" alt="Reply" className="w-5 h-5" />
          )}
        </button>
      </div>

      {showReply && user && (
        <form onSubmit={handleReplySubmit} className="mb-4">
          <textarea
            value={replyText}
            rows={2}
            placeholder="Leave a reply"
            className="w-full border border-white/10 bg-transparent p-2 rounded"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-slate-800 text-white px-4 py-2 rounded cursor-pointer transition-opacity hover:opacity-85"
          >
            {isPending ? "Posting..." : "Post reply"}
          </button>
          {isError && <p>Something was wrong :/</p>}
        </form>
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="mb-8">
          <button className="cursor-pointer hover:text-gray-500 transition duration-300" onClick={() => setIsCollapsed((prev) => !prev)}>
            {isCollapsed ? "Replies" : "Hide"}
          </button>

          {!isCollapsed && (
            <div className="mx-5 my-2">
                {comment.children.map((child, key) => (
                    <CommentItem key={key} comment={child} postId={postId} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
