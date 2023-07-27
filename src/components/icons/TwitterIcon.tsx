export const TwitterIcon: React.FC<React.SVGProps<SVGElement>> = ({
  ref,
  ...props
}) => (
  <svg width={32} height={32} viewBox="0 0 64 64" {...props}>
    <rect
      width={64}
      height={64}
      fill="#00aced"
      rx={0}
      ry={0}
      className="shareLinkButtonIconBgFill"
    />
    <path
      className="shareLinkButtonIconIconFill"
      d="M48 22.1c-1.2.5-2.4.9-3.8 1 1.4-.8 2.4-2.1 2.9-3.6-1.3.8-2.7 1.3-4.2 1.6-1.2-1.3-2.9-2.1-4.7-2.1-3.6 0-6.6 2.9-6.6 6.6 0 .5.1 1 .2 1.5-5.5-.3-10.3-2.9-13.5-6.9-.6 1-.9 2.1-.9 3.3 0 2.3 1.2 4.3 2.9 5.5-1.1 0-2.1-.3-3-.8v.1c0 3.2 2.3 5.8 5.3 6.4-.6.1-1.1.2-1.7.2-.4 0-.8 0-1.2-.1.8 2.6 3.3 4.5 6.1 4.6-2.2 1.8-5.1 2.8-8.2 2.8-.5 0-1.1 0-1.6-.1C18.9 44 22.4 45 26.1 45c12.1 0 18.7-10 18.7-18.7v-.8c1.2-1 2.3-2.1 3.2-3.4z"
    />
  </svg>
);