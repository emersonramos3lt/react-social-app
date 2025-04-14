import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as Community[];
};

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {data?.map((community, key) => (
        <div key={key}
        className="border border-white p-4 rounded-lg hover:scale-95 transition duration-300">
          <Link to={`/community/${community.id}`} className="text-2xl font-bold  hover:underline">
            {community.name}
          </Link>
          <p className="text-gray-500 mt-2">{community.description}</p>
        </div>
      ))}
    </div>
  );
};
