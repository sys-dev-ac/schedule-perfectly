import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SchedulerHeaderProps {
  userName: string;
  userImage?: string;
}

export const SchedulerHeader = ({ userName, userImage }: SchedulerHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card mb-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">Pick a time with:</p>
          <p className="font-semibold text-foreground">{userName}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          AVX
        </div>
      </div>
    </header>
  );
};
