"use client";

import { useMemo, useState } from "react";
import { PortalCard } from "@/components/portal/portal-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { filterPortals } from "@/lib/search";
import type { Ministry, PortalViewModel } from "@/lib/types";

type PortalDirectoryProps = {
  portals: PortalViewModel[];
  ministries: Ministry[];
};

export function PortalDirectory({ portals, ministries }: PortalDirectoryProps) {
  const [query, setQuery] = useState("");
  const [ministryId, setMinistryId] = useState("");

  const results = useMemo(
    () => filterPortals(portals, { query, ministryId, tag: "" }),
    [ministryId, portals, query],
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white/90">
            Portals Directory
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            Search official and commonly used Maldives portals.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search portals, ministry, or topic..."
            value={query}
          />
          <Select
            onChange={(event) => setMinistryId(event.target.value)}
            value={ministryId}
          >
            <option value="">All ministries / authorities</option>
            {ministries.map((ministry) => (
              <option key={ministry.id} value={ministry.id}>
                {ministry.name}
              </option>
            ))}
          </Select>
        </div>
      </section>

      <section className="space-y-5">
        <p className="text-sm text-zinc-600">
          {results.length} portal{results.length === 1 ? "" : "s"} found
        </p>
        {results.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((portal) => (
              <PortalCard key={portal.id} portal={portal} />
            ))}
          </div>
        ) : (
          <div className="flex bg-white rounded-lg min-h-24 items-center justify-center p-6 text-center text-zinc-600">
            Try searching for a different keyword.
          </div>
        )}
      </section>
    </main>
  );
}
