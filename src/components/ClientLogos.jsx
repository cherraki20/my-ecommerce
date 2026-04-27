import { useState } from "react";
import { clients } from "../data/clients.js";

function ClientMark({ client }) {
  const [failed, setFailed] = useState(false);
  const hasLogo = client.logo && !failed;

  if (hasLogo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        onError={() => setFailed(true)}
        className="h-12 w-auto max-w-[120px] flex-shrink-0 object-contain transition-opacity duration-300 hover:opacity-80"
      />
    );
  }

  return (
    <span className="flex-shrink-0 text-xs font-bold uppercase tracking-wider text-gray-400 transition-colors duration-300 hover:text-[#1D6FF2] whitespace-nowrap">
      {client.name}
    </span>
  );
}

export default function ClientLogos() {
  const doubled = [...clients, ...clients];

  return (
    <section className="border-y border-ink/5 bg-[#F8F9FB] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#1D6FF2] mb-3">
          Nos Références
        </p>
        <h2 className="mb-10 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
          Ils nous font confiance
        </h2>
      </div>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max items-center gap-5 animate-[brand-scroll_60s_linear_infinite] hover:[animation-play-state:paused]">
          {doubled.map((client, index) => (
            <ClientMark key={`${client.id}-${index}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
