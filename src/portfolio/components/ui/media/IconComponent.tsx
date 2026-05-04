import { Database, Layout, Rocket, ShieldCheck, Star, Users } from 'lucide-react';
import type { ComponentType } from 'react';

const IconMap: Record<string, ComponentType<{ className?: string }>> = {
  users: Users,
  rocket: Rocket,
  shield: ShieldCheck,
  layout: Layout,
  server: Database,
};

export const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = IconMap[name] ?? Star;
  return <Icon className={className} />;
};
