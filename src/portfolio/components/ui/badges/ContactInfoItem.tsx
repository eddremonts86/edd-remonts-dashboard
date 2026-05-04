import type { LucideIcon } from 'lucide-react';

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

/** Icon + label + value row used in the Contact section. */
export const ContactInfoItem = ({ icon: Icon, label, value, href }: ContactInfoItemProps) => {
  const content = (
    <>
      <div className="bg-background/5 flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300 group-hover:bg-primary">
        <Icon className="h-6 w-6 text-background transition-colors duration-300 group-hover:text-white" />
      </div>
      <div>
        <span className="mb-1 block text-xs font-bold uppercase tracking-widest opacity-50">
          {label}
        </span>
        <span className="text-xl font-black tracking-wide transition-colors group-hover:text-primary md:text-2xl">
          {value}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="group flex w-fit items-center gap-6">
        {content}
      </a>
    );
  }

  return <div className="flex w-fit cursor-default items-center gap-6">{content}</div>;
};
