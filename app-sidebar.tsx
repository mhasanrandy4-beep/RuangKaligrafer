import { Home, Video, Upload, TrendingUp, Trophy, User, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import logoUrl from "@assets/Mask group (1)_1763435994353.png";

const menuItems = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
  {
    title: "Video Pembelajaran",
    url: "/videos",
    icon: Video,
  },
  {
    title: "Submit Latihan",
    url: "/submit",
    icon: Upload,
  },
  {
    title: "Progress Saya",
    url: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
  },
];

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: "student" | "tutor" | "admin";
  credits: number;
}

export function AppSidebar({ activeTab, onTabChange, userRole, credits }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Ruang Kaligrafer" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="font-serif font-bold text-lg text-primary">Ruang Kaligrafer</h2>
            <p className="text-xs text-muted-foreground">Platform Pembelajaran</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeTab === item.url}
                    onClick={() => onTabChange(item.url)}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <button className="w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "tutor" && (
          <SidebarGroup>
            <SidebarGroupLabel>Tutor</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeTab === "/corrections"}
                    onClick={() => onTabChange("/corrections")}
                    data-testid="link-corrections"
                  >
                    <button className="w-full">
                      <Settings />
                      <span>Koreksi Siswa</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeTab === "/verify-tutors"}
                    onClick={() => onTabChange("/verify-tutors")}
                    data-testid="link-verify-tutors"
                  >
                    <button className="w-full">
                      <User />
                      <span>Verifikasi Tutor</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="bg-card rounded-lg p-3 border border-card-border">
          <p className="text-xs text-muted-foreground mb-1">Kredit Saya</p>
          <p className="text-2xl font-bold text-primary" data-testid="text-credits">{credits}</p>
          <p className="text-xs text-muted-foreground mt-1">kredit tersisa</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
