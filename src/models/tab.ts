import type { Link } from "./link";

type Tab = {
  id: number
  label: string
  groups: Link[]
  iconUrl: string
  order: number
};

export type { Tab }
