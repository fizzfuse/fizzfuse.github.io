import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Gift, Calendar, Clock, Coffee, 
  ExternalLink, CalendarPlus, ThumbsUp, Loader2 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SHEETS_ENDPOINT = 'YOUR_GOOGLE_SCRIPT_DEPLOYMENT_URL';

const ITINERARY_DATA = [
  {
    day: "Friday, December 6th",
    title: "Welcome Dinner & Game Night",
    details: [
      "Dinner at Bella's Italian Restaurant (6:00 PM - 8:00 PM)",
      "Game night at Sarah's place (8:30 PM onwards)",
    ],
    location: "Bella's Italian Restaurant → Sarah's House",
    timeline: "6:00 PM - Late"
  },
  {
    day: "Saturday, December 7th",
    title: "Adventure Day & Party",
    details: [
      "Escape Room at Puzzle Masters (11:00 AM)",
      "Lunch at Fusion Kitchen (1:30 PM)",
      "Birthday Party at Skyline Lounge (7:00 PM - 11:00 PM)",
    ],
    location: "Multiple Locations - See Details",
    timeline: "11:00 AM - 11:00 PM"
  },
  {
    day: "Sunday, December 8th",
    title: "Recovery Brunch",
    details: [
      "Brunch buffet at The Garden Café",
      "Outdoor seating available (weather permitting)",
    ],
    location: "The Garden Café",
    timeline: "11:00 AM - 2:00 PM"
  }
];

const WISHLIST_DATA = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    price: 150,
    description: "RGB Mechanical Keyboard with Brown Switches. Features customizable RGB lighting, hot-swappable switches, and wireless connectivity. Perfect for both gaming and productivity.",
    category: "Tech",
    image: "/api/placeholder/400/300",
    link: "https://example.com/keyboard"
  },
  {
    id: 2,
    name: "Studio Ghibli Art Book",
    price: 45,
    description: "Collector's Edition Art Book featuring concept art, character designs, and background illustrations from all Studio Ghibli films. Includes exclusive interviews and behind-the-scenes content.",
    category: "Books",
    image: "/api/placeholder/400/300",
    link: "https://example.com/artbook"
  },
  {
    id: 3,
    name: "Nintendo Switch Game",
    price: 60,
    description: "Latest Mario adventure game with stunning graphics, new power-ups, and multiplayer features. Includes all DLC content and exclusive in-game items.",
    category: "Gaming",
    image: "/api/placeholder/400/300",
    link: "https://example.com/game"
  }
];

const ChromeTitle = () => (
  <div className="relative text-center p-4">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-white text-transparent bg-clip-text">
      Sarah's Birthday Celebration!
    </h1>
  </div>
);

const BirthdayFundButton = () => (
  <Button 
    className="bg-cyan-500/90 hover:bg-cyan-600 flex items-center justify-center gap-2 shadow-lg 
    shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105 mt-4 mx-auto"
    onClick={() => window.open('https://ko-fi.com/yourlink/', '_blank')}
  >
    <Coffee className="h-4 w-4" />
    Contribute to Birthday Fund
  </Button>
);

const AddToCalendarButton = ({ event }) => {
  const handleCalendarAdd = async (type) => {
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          type: 'itinerary_interaction',
          date: event.day,
          title: event.title
        })
      });

      if (type === 'google') {
        window.open('https://calendar.google.com', '_blank');
      } else {
        window.open('webcal://calendar.apple.com', '_blank');
      }
    } catch (error) {
      console.error('Calendar add failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="w-full border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-300"
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleCalendarAdd('google')}>
          Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCalendarAdd('apple')}>
          Apple Calendar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const EventActions = ({ event }) => {
  const [isInterested, setIsInterested] = useState(false);

  const handleInterested = async () => {
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
          type: 'itinerary_interaction',
          date: event.day,
          title: event.title
        })
      });
      setIsInterested(true);
    } catch (error) {
      console.error('Interest marking failed:', error);
    }
  };

  return isInterested ? (
    <AddToCalendarButton event={event} />
  ) : (
    <Button 
      variant="outline"
      className="w-full border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/10 transition-all duration-300"
      onClick={handleInterested}
    >
      <ThumbsUp className="mr-2 h-4 w-4" />
      Interested
    </Button>
  );
};

const ItineraryDay = ({ day }) => (
  <Card className="bg-gray-900/50 border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 
  transition-all duration-300 relative group">
    <CardHeader className="relative">
      <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
        <Calendar className="h-5 w-5 text-cyan-400" />
        {day.day}
      </CardTitle>
      <CardDescription className="text-base md:text-lg text-cyan-400/90 font-medium">
        {day.title}
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 relative">
      <ul className="text-white/80 space-y-1 text-sm md:text-base">
        {day.details.map((detail, index) => (
          <li key={index} className="list-disc ml-4">{detail}</li>
        ))}
      </ul>
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <Clock className="h-4 w-4 text-red-400" />
        <span>
          <span className="text-cyan-400">{day.location}</span>
          <span className="text-red-400"> • </span>
          <span className="text-red-400">{day.timeline}</span>
        </span>
      </div>
      <EventActions event={day} />
    </CardContent>
  </Card>
);

const WishlistItem = ({ item }) => (
  <Card className="bg-gray-900/50 border-cyan-400/20 backdrop-blur-sm hover:border-cyan-400/40 
  transition-all duration-300 group relative h-[500px] flex flex-col">
    <CardHeader className="pb-4 relative">
      <div className="aspect-video overflow-hidden rounded-lg mb-4 h-36 md:h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardTitle className="text-base md:text-lg text-white group-hover:text-cyan-300 
      transition-colors line-clamp-1">
        {item.name}
      </CardTitle>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary" className="bg-cyan-400/10 text-cyan-400 text-xs md:text-sm">
          ${item.price}
        </Badge>
        <Badge variant="outline" className="border-cyan-400/20 text-cyan-400 text-xs md:text-sm">
          {item.category}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4 relative flex-grow flex flex-col">
      <p className="text-white/80 text-xs md:text-sm line-clamp-3 flex-grow">
        {item.description}
      </p>
      <div className="space-y-2 mt-auto">
        <Button 
          variant="outline" 
          className="w-full border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-400/10 
          transition-all duration-300"
          onClick={() => window.open(item.link, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Item
        </Button>
        <Button 
          className="w-full bg-cyan-500/90 hover:bg-cyan-600 flex items-center justify-center gap-2 
          shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
          onClick={() => window.open(`https://ko-fi.com/yourlink/`, '_blank')}
        >
          <Coffee className="h-4 w-4" />
          Contribute ${item.price}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BirthdayApp = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 md:p-6">
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent)] 
    pointer-events-none" />
    
    <div className="max-w-6xl mx-auto mb-8 md:mb-12 text-center relative">
      <ChromeTitle />
      <BirthdayFundButton />
    </div>

    <div className="max-w-6xl mx-auto mb-8 md:mb-16 relative">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-2 text-cyan-400">
        <Calendar className="text-cyan-400" />
        Weekend Itinerary
      </h2>
      <div className="space-y-4 md:space-y-6">
        {ITINERARY_DATA.map((day, index) => (
          <ItineraryDay key={index} day={day} />
        ))}
      </div>
    </div>

    <div className="max-w-6xl mx-auto mb-8 md:mb-16 relative">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-2 text-cyan-400">
        <Gift className="text-cyan-400" />
        Wishlist
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WISHLIST_DATA.map(item => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  </div>
);

export default BirthdayApp;