import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Users, FileText } from "lucide-react";

interface BookingConfirmationProps {
  userName: string;
  userImage: string;
  selectedDate: Date;
  selectedTime: string;
  timezone: string;
  guestEmail?: string;
  onReschedule: () => void;
}

export const BookingConfirmation = ({
  userName,
  userImage,
  selectedDate,
  selectedTime,
  timezone,
  guestEmail = "team@startyoursaas.io",
  onReschedule
}: BookingConfirmationProps) => {
  const [hours, minutes] = selectedTime.split(':');
  const startTime = new Date(selectedDate);
  startTime.setHours(parseInt(hours), parseInt(minutes));
  
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + 30);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Header with avatar */}
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <p className="text-muted-foreground text-sm mb-1">⭐ You are meeting with</p>
            <h1 className="text-3xl font-bold text-foreground">{userName}</h1>
          </div>
        </div>

        {/* Success message */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-primary font-medium">
            An email has been sent with the full booking details! 🎉
          </p>
        </div>

        {/* Booking details card */}
        <div className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">
          {/* Time */}
          <div className="p-6 flex items-start gap-4">
            <div className="bg-muted rounded-full p-3 flex-shrink-0">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1">Time</h3>
              <p className="text-foreground">
                {format(selectedDate, 'EEEE, MMM do')}, {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')} {timezone}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onReschedule}
              className="text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              Reschedule
            </Button>
          </div>

          {/* Guests */}
          <div className="p-6 flex items-start gap-4">
            <div className="bg-muted rounded-full p-3 flex-shrink-0">
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1">Guests</h3>
              <p className="text-foreground break-all">{guestEmail}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-6 flex items-start gap-4">
            <div className="bg-muted rounded-full p-3 flex-shrink-0">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1">Booking Details</h3>
              <p className="text-foreground">
                We've sent an email with your full booking details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
