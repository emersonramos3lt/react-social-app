import { CommunityList } from "../components/CommunityList"

export const CommunitiesPage = () => {
    return (
        <div>
            <h2 className="my-12 text-2xl md:text-4xl flex items-center justify-center gap-2"> Communities <img src="/communities.svg" alt="Chat icon" className="w-8 h-8" /></h2>
            <CommunityList />
        </div>
    )
}