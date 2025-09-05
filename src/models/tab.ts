import type { Link } from "./link";

type Tab = {
  id: number;
  label: string;
  iconUrl: string;
  order: number;
  groups: {
    id: number;
    name: string;
    linksIds: Link['id'][];
  }[];
};

export type { Tab }
