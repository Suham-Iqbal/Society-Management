import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { PartyPopper, Users, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: 'Diwali Celebration',
      date: '2025-11-05',
      time: '6:00 PM - 10:00 PM',
      location: 'Clubhouse',
      attendees: 45,
      maxAttendees: 100,
      category: 'Festival',
      description: 'Join us for a grand Diwali celebration with cultural performances, dinner, and fireworks.',
      status: 'registered',
    },
    {
      id: 2,
      title: 'Yoga Session',
      date: '2025-11-08',
      time: '7:00 AM - 8:00 AM',
      location: 'Community Garden',
      attendees: 12,
      maxAttendees: 20,
      category: 'Wellness',
      description: 'Weekly yoga and meditation session for all age groups.',
      status: 'open',
    },
    {
      id: 3,
      title: 'Kids Art Workshop',
      date: '2025-11-10',
      time: '4:00 PM - 6:00 PM',
      location: 'Community Hall',
      attendees: 18,
      maxAttendees: 25,
      category: 'Kids',
      description: 'Creative art workshop for children aged 6-12 years.',
      status: 'open',
    },
    {
      id: 4,
      title: 'Annual General Meeting',
      date: '2025-11-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Clubhouse',
      attendees: 67,
      maxAttendees: 150,
      category: 'Official',
      description: 'Annual general body meeting to discuss society matters and future plans.',
      status: 'open',
    },
  ];

  const pastEvents = [
    {
      title: 'Dandiya Night',
      date: '2025-10-20',
      attendees: 85,
    },
    {
      title: 'Blood Donation Camp',
      date: '2025-10-12',
      attendees: 42,
    },
    {
      title: 'Independence Day Celebration',
      date: '2025-08-15',
      attendees: 120,
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Festival: 'bg-purple-500',
      Wellness: 'bg-green-500',
      Kids: 'bg-blue-500',
      Official: 'bg-orange-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900">Community Events</h2>
        <p className="text-slate-600">Participate in society activities and celebrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-slate-900">Upcoming Events</h3>
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle>{event.title}</CardTitle>
                      <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <PartyPopper className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} registered
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {event.status === 'registered' ? (
                    <>
                      <Button variant="outline" className="flex-1">
                        Cancel Registration
                      </Button>
                      <Button variant="outline">Add to Calendar</Button>
                    </>
                  ) : (
                    <>
                      <Button className="flex-1">Register Now</Button>
                      <Button variant="outline">More Info</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Past Events</CardTitle>
              <CardDescription>Recently concluded activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pastEvents.map((event, index) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg">
                  <p className="text-slate-900">{event.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-slate-500">{event.date}</p>
                    <p className="text-sm text-slate-600">{event.attendees} attended</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
