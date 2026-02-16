import ministriesData from "@/data/ministries.json";
import portalsData from "@/data/portals.json";
import type { Ministry, Portal, PortalViewModel } from "@/lib/types";

const ministries = ministriesData as Ministry[];
const portals = portalsData as Portal[];

const ministryMap = new Map(
  ministries.map((ministry) => [ministry.id, ministry.name]),
);

export function getMinistries() {
  return ministries;
}

export function getPortals() {
  return portals;
}

export function getPortalsWithMinistry() {
  return portals.map<PortalViewModel>((portal) => ({
    ...portal,
    ministryName: ministryMap.get(portal.ministryId) ?? "Unknown Authority",
  }));
}

export function getPortalById(id: string) {
  const entry = portals.find((portal) => portal.id === id);
  if (!entry) {
    return null;
  }

  return {
    ...entry,
    ministryName: ministryMap.get(entry.ministryId) ?? "Unknown Authority",
  } as PortalViewModel;
}

export function getRelatedPortals(portal: PortalViewModel, limit = 4) {
  return getPortalsWithMinistry()
    .filter((entry) => entry.id !== portal.id)
    .filter(
      (entry) =>
        entry.ministryId === portal.ministryId ||
        entry.tags.some((tag) => portal.tags.includes(tag)),
    )
    .slice(0, limit);
}

export function getAllTags() {
  const tags = new Set<string>();
  for (const portal of portals) {
    for (const tag of portal.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
