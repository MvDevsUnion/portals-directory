import { PortalDirectory } from "@/components/portal/portal-directory";
import { getMinistries, getPortalsWithMinistry } from "@/lib/data";

export default function HomePage() {
  const portals = getPortalsWithMinistry();
  const ministries = getMinistries();

  return <PortalDirectory ministries={ministries} portals={portals} />;
}
