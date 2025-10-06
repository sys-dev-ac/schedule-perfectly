import { useState, useEffect } from "react";
import { format, addWeeks, startOfWeek, startOfDay } from "date-fns";
import { SchedulerHeader } from "@/components/SchedulerHeader";
import { DateSelector } from "@/components/DateSelector";
import { TimeSelector } from "@/components/TimeSelector";
import { BookingConfirmation } from "@/components/BookingConfirmation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Mock API function - replace with actual API call
const fetchAvailability = async (date: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - in production, this would come from your backend
  const mockSlots = [
    "11:30", "11:45", "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "15:15", "15:30", "16:30"
  ];
  
  return {
    date,
    slots: mockSlots
  };
};

const Index = () => {
  const [weekStart, setWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Fetch available dates for the week
  useEffect(() => {
    const fetchWeekAvailability = async () => {
      // Mock: In production, fetch which dates have availability
      const dates: string[] = [];
      const today = startOfDay(new Date());
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        
        // Only add future dates
        if (date >= today) {
          dates.push(format(date, 'yyyy-MM-dd'));
        }
      }
      
      setAvailableDates(dates);
    };

    fetchWeekAvailability();
  }, [weekStart]);

  // Fetch time slots when date changes
  useEffect(() => {
    const loadSlots = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const data = await fetchAvailability(dateStr);
        setAvailableSlots(data.slots);
      } catch (error) {
        console.error('Error fetching availability:', error);
        toast.error('Failed to load available times');
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadSlots();
    setSelectedTime(null); // Reset time selection when date changes
  }, [selectedDate]);

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const today = startOfDay(new Date());
    const newWeekStart = addWeeks(weekStart, direction === 'next' ? 1 : -1);
    
    // Don't allow going to past weeks
    if (direction === 'prev' && newWeekStart < startOfWeek(today, { weekStartsOn: 0 })) {
      return;
    }
    
    setWeekStart(newWeekStart);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(startOfDay(date));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async () => {
    if (!selectedTime) return;
    
    setIsBooking(true);
    
    // Mock booking submission with loading
    const bookingData = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      timezone: userTimezone,
      duration: 30
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Booking submitted:', bookingData);
    
    setIsBooking(false);
    setIsConfirmed(true);
    
    // In production, send this to your backend:
    // await fetch('/api/book', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(bookingData)
    // });
  };

  const handleReschedule = () => {
    setIsConfirmed(false);
    setSelectedTime(null);
  };

  if (isConfirmed && selectedTime) {
    return (
      <BookingConfirmation
        userName="Rashmi Kalra"
        userImage=""
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        timezone={userTimezone}
        onReschedule={handleReschedule}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SchedulerHeader 
        userName="Rashmi Kalra"
        userImage=""
      />
      
      <main className="py-8 space-y-8">
        <DateSelector
          weekStart={weekStart}
          selectedDate={selectedDate}
          onWeekChange={handleWeekChange}
          onDateSelect={handleDateSelect}
          availableDates={availableDates}
        />
        
        {loading ? (
          <div className="text-center text-muted-foreground">
            Loading available times...
          </div>
        ) : (
          <TimeSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            availableSlots={availableSlots}
            timezone={userTimezone}
          />
        )}

        {selectedTime && (
          <div className="max-w-4xl mx-auto px-4">
            <Button
              size="lg"
              className="w-full"
              onClick={handleConfirmBooking}
              disabled={isBooking}
            >
              {isBooking ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Confirming booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
