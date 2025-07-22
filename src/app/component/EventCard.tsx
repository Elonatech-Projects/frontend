import Image from 'next/image';

export type Event = {
  title: string;
  title2: string
  description: string;
  flyerSrc?: string;
  videoSrc?: string;
};

export default function EventCard({ event, onOpen }: { event: Event; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
    >
      {event.videoSrc ? (
        <video
          src={event.videoSrc}
          poster={event.flyerSrc} // flyer used as thumbnail/poster
          className="w-full h-48 object-cover"
          muted
          playsInline
          preload="metadata"
          controls={false}  // no controls, video won't play on its own
        />
      ) : (
        <Image
          src={event.flyerSrc!}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
        {event.title2 && (
          <h5 className="text-md text-white mb-2">{event.title2}</h5>
        )}
        <p className="text-purple-100 text-sm">{event.description}</p>
      </div>
    </div>
  );
}
