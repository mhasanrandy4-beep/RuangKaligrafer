import { LeaderboardTable } from '../leaderboard-table';

export default function LeaderboardTableExample() {
  const entries = [
    { rank: 1, userId: "1", name: "Ahmad Rizki", points: 2580, submissions: 52 },
    { rank: 2, userId: "2", name: "Fatimah Zahra", points: 2450, submissions: 48 },
    { rank: 3, userId: "3", name: "Ibrahim Hassan", points: 2320, submissions: 45 },
    { rank: 4, userId: "4", name: "Aisyah Nur", points: 2180, submissions: 42 },
    { rank: 5, userId: "5", name: "Muhammad Ali", points: 2050, submissions: 40 },
    { rank: 6, userId: "6", name: "Khadijah Amira", points: 1920, submissions: 38 },
  ];

  return (
    <div className="p-8 max-w-3xl">
      <LeaderboardTable entries={entries} currentUserId="4" />
    </div>
  );
}
