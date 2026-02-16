export type PortalStatus = "active" | "deprecated";

export type Ministry = {
  id: string;
  name: string;
};

export type Portal = {
  id: string;
  url: string;
  title: string;
  ministryId: string;
  tags: string[];
  description: string;
  status: PortalStatus;
  lastVerified: string;
};

export type PortalViewModel = Portal & {
  ministryName: string;
};
