import { format, parse, isBefore } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";

interface TimeSelectorProps {
  selectedDate: Date;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  availableSlots: string[];
  timezone: string;
}

export const TimeSelector = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  availableSlots,
  timezone,
}: TimeSelectorProps) => {
  const now = new Date();
  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');

  const isTimeSlotDisabled = (slot: string) => {
    if (!isToday) return false;
    
    const [hours, minutes] = slot.split(':').map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hours, minutes, 0, 0);
    
    return isBefore(slotTime, now);
  };

  const formatTimeSlot = (slot: string) => {
    const [hours, minutes] = slot.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return format(date, 'h:mm a');
  };

  const getTimezoneDisplay = () => {
    const zonedTime = toZonedTime(now, timezone);
    const timeStr = format(zonedTime, 'HH:mm');
    return `${timezone.replace(/_/g, ' ')} (${timeStr})`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8">
      <h2 className="text-xl font-semibold text-center mb-2 text-foreground">
        What time works?
      </h2>
      
      <p className="text-sm text-muted-foreground text-center mb-6">
        30 minute meeting • {getTimezoneDisplay()}
      </p>

      {availableSlots.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No times available for this day</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
          {availableSlots.map((slot) => {
            const isDisabled = isTimeSlotDisabled(slot);
            const isSelected = selectedTime === slot;

            return (
              <Button
                key={slot}
                onClick={() => !isDisabled && onTimeSelect(slot)}
                disabled={isDisabled}
                variant={isSelected ? "default" : "outline"}
                className={`
                  h-12 font-medium transition-all
                  ${isSelected 
                    ? 'bg-[hsl(var(--scheduler-selected))] text-[hsl(var(--scheduler-selected-foreground))] hover:bg-[hsl(var(--scheduler-selected))] border-[hsl(var(--scheduler-selected))]' 
                    : isDisabled
                    ? 'bg-[hsl(var(--scheduler-disabled))] text-[hsl(var(--scheduler-disabled-foreground))] cursor-not-allowed border-[hsl(var(--scheduler-border))]'
                    : 'hover:border-[hsl(var(--scheduler-selected))] hover:bg-[hsl(var(--scheduler-hover))] hover:text-foreground'
                  }
                `}
              >
                {formatTimeSlot(slot)}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
