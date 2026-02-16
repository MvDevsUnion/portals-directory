import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPortalById, getPortals, getRelatedPortals } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getPortals().map((portal) => ({ id: portal.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const portal = getPortalById(id);

  if (!portal) {
    return {
      title: "Portal not found | Portals.mv",
    };
  }

  return {
    title: `${portal.title} | Portals.mv`,
    description: portal.description,
  };
}

export default async function PortalDetailPage({ params }: PageProps) {
  const { id } = await params;
  const portal = getPortalById(id);

  if (!portal) {
    notFound();
  }

  const relatedPortals = getRelatedPortals(portal, 4);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <Link
          className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline"
          href="/"
        >
          Back to directory
        </Link>
        <a href={portal.url} rel="noreferrer" target="_blank">
          <Button>Open portal</Button>
        </a>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl ">{portal.title}</CardTitle>
          <CardDescription>{portal.ministryName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-zinc-700">{portal.description}</p>
          <div className="flex flex-wrap gap-2">
            {portal.tags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-zinc-600">
            <p>Status: {portal.status}</p>
            <p>Last verified: {portal.lastVerified}</p>
          </div>
        </CardContent>
      </Card>

      {relatedPortals.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Related portals</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedPortals.map((entry) => (
              <Card key={entry.id}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base">{entry.title}</CardTitle>
                  <CardDescription>{entry.ministryName}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-0">
                  <Link
                    className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline"
                    href={`/portal/${entry.id}`}
                  >
                    View details
                  </Link>
                  <a
                    className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline"
                    href={entry.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open portal
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
