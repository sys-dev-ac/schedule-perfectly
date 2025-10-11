import { useForm } from 'react-hook-form';
import { User, Mail, Users, FileText, Phone } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { UserData } from '@/pages/Index';
import { useEffect, useState } from 'react';

interface BookingFormProps {
    selectedDate: Date;
    selectedTime: string;
    timezone: string;
    onSubmit: (data: UserData) => void;
    onBack?: () => void;
}

export const BookingForm = ({
    selectedDate,
    selectedTime,
    timezone,
    onSubmit,
    onBack
}: BookingFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [country, setCountry] = useState('in');

    // Initialize react-hook-form
    const form = useForm<UserData>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            leadValue: 0,
            location: '',
        },
    });

    const handleSubmit = async (data: UserData) => {
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onSubmit(data);
        setIsSubmitting(false);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // fetch country based on the ip 
    const fetchCountry = async () => {
        try {
            const data = await fetch('https://ipapi.co/json/');
            const json = await data.json();

            if (json && json.country_code) {
                setCountry(json.country_code.toLowerCase());
            }

        } catch (error) {
            console.log('Error fetching country:', error);
        }
    };


    useEffect(() => {
        fetchCountry();
    }, []);

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Name *
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Email *
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="your.email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        Phone *
                                    </FormLabel>
                                    <FormControl>
                                        <PhoneInput
                                            country={country}
                                            value={field.value}
                                            onChange={field.onChange}
                                            inputProps={{
                                                required: true,
                                                name: 'phone',
                                            }}
                                            containerClass="w-full"
                                            inputClass="!w-full !border !border-input !rounded-md !bg-background !text-sm !py-2.5 !pl-12 !pr-3 !text-foreground placeholder:!text-muted-foreground focus:!outline-none focus:!ring-2 focus:!ring-ring focus:!ring-offset-2 disabled:!cursor-not-allowed disabled:!opacity-50"
                                            buttonClass="!border-none !bg-transparent !pl-3"
                                            dropdownClass="!bg-background !text-foreground !border !border-input"
                                            enableSearch
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="leadValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Lead Value
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="1"
                                            placeholder='Enter Your lead here'
                                            max="10"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Location *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder='Your best number to call you ?'
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onBack}
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
};