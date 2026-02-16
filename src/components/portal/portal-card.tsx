import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PortalViewModel } from "@/lib/types";

type PortalCardProps = {
  portal: PortalViewModel;
};

export function PortalCard({ portal }: PortalCardProps) {
  return (
    <Card className="h-full bg-white/90 border-0">
      <CardHeader>
        <CardTitle>{portal.title}</CardTitle>
        <CardDescription>{portal.ministryName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-zinc-700">{portal.description}</p>
        <div className="flex flex-wrap gap-2">
          {portal.tags.map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline"
          href={`/portal/${portal.id}`}
        >
          Details
        </Link>
        <a href={portal.url} rel="noreferrer" target="_blank">
          <Button>Open portal</Button>
        </a>
      </CardFooter>
    </Card>
  );
}
