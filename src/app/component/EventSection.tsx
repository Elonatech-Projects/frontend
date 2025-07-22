import EventCard, { Event } from './EventCard';

export default function EventsSection({
  events,
  onEventClick,
}: {
  events: Event[];
  onEventClick: (event: Event) => void;
}) {
  return (
    <div className="mt-20 max-w-6xl w-full">
      <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.title} event={event} onOpen={() => onEventClick(event)} />
        ))}
      </div>
    </div>
  );
}
