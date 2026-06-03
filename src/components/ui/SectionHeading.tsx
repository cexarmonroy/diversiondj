type SectionHeadingProps = {
  children: React.ReactNode;
  icon?: string;
};

export function SectionHeading({ children, icon }: SectionHeadingProps) {
  return (
    <div className="mb-5 sm:mb-6">
      <div className="mb-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 sm:w-16" />
      <h2 className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-wide text-white sm:text-xl lg:text-2xl">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </h2>
    </div>
  );
}
