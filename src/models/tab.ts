import type { LinkServer, LinkUi } from "./link";

type TabServer = {
  id: number;
  label: string;
  iconUrl: string;
  order: number;
  groups: {
    id: number;
    name: string;
    linksIds: LinkServer['id'][];
  }[];
};

type TabUi = Omit<TabServer, "groups"> & {
  groups: (TabServer["groups"][number] & { links: LinkUi[] })[]
}

export type { TabServer, TabUi }
