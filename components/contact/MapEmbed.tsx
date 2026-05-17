"use client";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-soft">
      <iframe
        title="HakimeRAD coverage map"
        src="https://maps.google.com/maps?width=100%25&amp;height=420&amp;hl=en&amp;q=Addis%20Ababa,%20Ethiopia&amp;t=&amp;z=6&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        width="100%"
        height={420}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full"
      />
    </div>
  );
}
