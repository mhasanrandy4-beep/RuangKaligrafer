import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  points: number;
  submissions: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  const topThree = entries.slice(0, 3);
  const rest = entries.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-primary" />;
      case 2:
        return <Medal className="w-6 h-6 text-chart-1" />;
      case 3:
        return <Award className="w-6 h-6 text-chart-5" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-primary text-primary-foreground";
      case 2:
        return "bg-chart-1 text-white";
      case 3:
        return "bg-chart-5 text-white";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Leaderboard
        </CardTitle>
        <CardDescription>Siswa terbaik bulan ini berdasarkan poin</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="weekly" data-testid="tab-weekly">Mingguan</TabsTrigger>
            <TabsTrigger value="monthly" data-testid="tab-monthly">Bulanan</TabsTrigger>
            <TabsTrigger value="alltime" data-testid="tab-alltime">Sepanjang Masa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {topThree.map((entry, idx) => {
                const position = idx === 0 ? 1 : idx === 1 ? 0 : 2;
                const actualEntry = idx === 0 ? topThree[0] : idx === 1 ? topThree[1] : topThree[2];
                
                return (
                  <div 
                    key={actualEntry.userId}
                    className={`flex flex-col items-center ${position === 1 ? 'order-1' : position === 0 ? 'order-0 mt-8' : 'order-2 mt-8'}`}
                    data-testid={`card-leaderboard-${actualEntry.rank}`}
                  >
                    <Badge className={`${getRankBadgeColor(actualEntry.rank)} mb-2`}>
                      #{actualEntry.rank}
                    </Badge>
                    <div className="relative">
                      <Avatar className={position === 1 ? "w-24 h-24 border-4 border-primary" : "w-20 h-20 border-2 border-border"}>
                        <AvatarImage src={actualEntry.avatar} />
                        <AvatarFallback>{actualEntry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        {getRankIcon(actualEntry.rank)}
                      </div>
                    </div>
                    <p className="font-semibold mt-3 text-center text-sm">{actualEntry.name}</p>
                    <p className="text-2xl font-bold text-primary">{actualEntry.points}</p>
                    <p className="text-xs text-muted-foreground">poin</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              {rest.map((entry) => (
                <div 
                  key={entry.userId}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    entry.userId === currentUserId ? 'bg-primary/10 border border-primary' : 'bg-accent'
                  }`}
                  data-testid={`row-leaderboard-${entry.rank}`}
                >
                  <div className="w-8 text-center font-bold text-muted-foreground">
                    {entry.rank}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={entry.avatar} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">{entry.submissions} submissions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{entry.points}</p>
                    <p className="text-xs text-muted-foreground">poin</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="weekly">
            <p className="text-center text-muted-foreground py-8">Data leaderboard mingguan</p>
          </TabsContent>
          <TabsContent value="alltime">
            <p className="text-center text-muted-foreground py-8">Data leaderboard sepanjang masa</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
