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

      <div className="bg-card p-4 rounded-xl">
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onWeekChange('prev')}
            className="h-10 w-10 rounded-full hover:bg-muted hover:text-foreground"
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
                    flex flex-col min-w-[44px] w-[44px] sm:min-w-[64px] sm:w-16 rounded-lg overflow-hidden border
                    transition-all duration-200
                    ${isSelected
                      ? 'border-[hsl(var(--scheduler-selected))] shadow-lg scale-105'
                      : isDisabled
                        ? 'border-[hsl(var(--scheduler-border))] cursor-not-allowed'
                        : 'border-[hsl(var(--scheduler-border))] hover:border-[hsl(var(--scheduler-selected))]'
                    }
                  `}
                >
                  <div className={`
                    text-[10px] sm:text-xs font-medium py-0.5 sm:py-1 text-center
                    ${isSelected
                      ? 'bg-[hsl(var(--scheduler-selected))] text-[hsl(var(--scheduler-selected-foreground))]'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {format(day, 'EEE')}
                  </div>
                  <div className={`
                    flex flex-col items-center justify-center py-2 sm:py-3 bg-card
                    ${isDisabled ? 'text-[hsl(var(--scheduler-disabled-foreground))]' : 'text-foreground'}
                  `}>
                    <span className="text-base sm:text-lg font-semibold">
                      {format(day, 'd')}
                    </span>
                    <span className="text-[10px] sm:text-xs">
                      {format(day, 'MMM')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onWeekChange('next')}
            className="h-10 w-10 rounded-full hover:bg-muted hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
