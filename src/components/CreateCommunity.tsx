import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";

interface CommunityInput {
  name: string;
  description: string;
}

const createCommunity = async (community: CommunityInput) => {
    const { error, data } = await supabase.from("communities").insert(community);
    
      if (error) throw new Error(error.message);
      return data
};

export const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities")
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, description });
  };
  return (
    <form className="max-w-2xl mx-auto space-y-8" onSubmit={handleSubmit}>
      <h2 className="text-center text-2xl md:text-4xl">Create a Community</h2>

      <div className="">
        <label className="font-medium">Community name</label>
        <input
          type="text"
          id="name"
          required
          placeholder="What is the name of your community?"
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded mt-2"
        />
      </div>

      <div>
        <label className="font-medium">Description</label>
        <br />
        <textarea
          id="description"
          required
          rows={3}
          placeholder="What will your community be about? Games? Literature? Technology?"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded mt-2"
        />
      </div>

      <button className="bg-white text-black p-2 px-10 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-white transition duration-400">
        {isPending ? "Loading..." : "Create"}
      </button>

      {isError && <p>Error creating community</p>}
    </form>
  );
};
