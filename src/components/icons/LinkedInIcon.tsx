export const LinkedInIcon: React.FC<React.SVGProps<SVGElement>> = ({
  ref,
  ...props
}) => (
  <svg width={32} height={32} viewBox="0 0 64 64" {...props}>
    <rect
      width={64}
      height={64}
      fill="#007fb1"
      rx={0}
      ry={0}
      style={{
        fill: "#000",
      }}
    />
    <path
      fill="#fff"
      d="M20.4 44h5.4V26.6h-5.4V44zm2.7-26c-1.7 0-3.1 1.4-3.1 3.1 0 1.7 1.4 3.1 3.1 3.1 1.7 0 3.1-1.4 3.1-3.1 0-1.7-1.4-3.1-3.1-3.1zm16.4 8.2c-2.6 0-4.4 1.4-5.1 2.8h-.1v-2.4h-5.2V44h5.4v-8.6c0-2.3.4-4.5 3.2-4.5 2.8 0 2.8 2.6 2.8 4.6V44H46v-9.5c0-4.7-1-8.3-6.5-8.3z"
    />
  </svg>
);
