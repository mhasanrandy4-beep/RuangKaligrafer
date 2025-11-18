import { LeaderboardTable } from "@/components/leaderboard-table";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";

export default function Leaderboard() {
  const { user: currentUser } = useAuth();
  
  const { data: leaderboardUsers = [] } = useQuery<User[]>({
    queryKey: ["/api/users/leaderboard", { limit: 50 }],
  });

  const entries = leaderboardUsers.map((user, index) => ({
    rank: index + 1,
    userId: user.id,
    name: user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}`
      : user.email || "User",
    points: user.points,
    submissions: 0, // TODO: Add submission count to query
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Lihat peringkat siswa terbaik dan raih posisi teratas!</p>
      </div>

      <LeaderboardTable entries={entries} currentUserId={currentUser?.id} />
    </div>
  );
}
