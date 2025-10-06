import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek, isSameDay, isBefore, startOfDay } from "date-fns";

interface DateSelectorProps {
  weekStart: Date;
  selectedDate: Date;
  onWeekChange: (direction: 'prev' | 'next') => void;
  onDateSelect: (date: Date) => void;
  availableDates: string[];
}

export const DateSelector = ({
  weekStart,
  selectedDate,
  onWeekChange,
  onDateSelect,
  availableDates,
}: DateSelectorProps) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = startOfDay(new Date());

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableDates.includes(dateStr);
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), today) || !isDateAvailable(date);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
        What day is best for you?
      </h2>
      
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onWeekChange('prev')}
          className="h-10 w-10 rounded-full hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {weekDays.map((day, index) => {
            const isSelected = isSameDay(day, selectedDate);
            const isDisabled = isDateDisabled(day);

            return (
              <button
                key={index}
                onClick={() => !isDisabled && onDateSelect(day)}
                disabled={isDisabled}
                className={`
                  flex flex-col items-center justify-center w-16 h-20 rounded-xl
                  transition-all duration-200
                  ${isSelected 
                    ? 'bg-[hsl(var(--scheduler-selected))] text-[hsl(var(--scheduler-selected-foreground))] shadow-lg scale-105' 
                    : isDisabled
                    ? 'bg-[hsl(var(--scheduler-disabled))] text-[hsl(var(--scheduler-disabled-foreground))] cursor-not-allowed'
                    : 'bg-card hover:bg-[hsl(var(--scheduler-hover))] border border-[hsl(var(--scheduler-border))]'
                  }
                `}
              >
                <span className="text-xs font-medium mb-1">
                  {format(day, 'EEE')}
                </span>
                <span className={`text-lg font-semibold ${isSelected ? 'text-white' : ''}`}>
                  {format(day, 'd')}
                </span>
                <span className="text-xs">
                  {format(day, 'MMM')}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onWeekChange('next')}
          className="h-10 w-10 rounded-full hover:bg-muted"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
