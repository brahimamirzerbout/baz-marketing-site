import { HubSidebar } from './HubSidebar';

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HubSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}