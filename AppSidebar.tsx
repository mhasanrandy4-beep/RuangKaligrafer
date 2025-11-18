import { AppSidebar } from '../app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

export default function AppSidebarExample() {
  const [activeTab, setActiveTab] = useState('/');
  
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userRole="student"
          credits={25}
        />
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-serif font-bold">Sidebar Preview</h2>
          <p className="text-muted-foreground">Active tab: {activeTab}</p>
        </div>
      </div>
    </SidebarProvider>
  );
}
