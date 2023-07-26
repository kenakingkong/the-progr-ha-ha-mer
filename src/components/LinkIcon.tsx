const LinkIcon: React.FC<React.SVGProps<SVGElement>> = ({ ref, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -144 1008 1008" {...props}>
    <path
      fill="currentColor"
      d="M552 314c102 47 168 150 168 262 0 158-125 244-228 348-54 53-128 84-204 84C129 1008 0 879 0 720c0-135 75-195 165-285l102 102c-53 52-123 101-123 183 0 79 65 144 144 144 38 0 75-15 102-42l144-144c27-27 42-64 42-102 0-56-33-108-84-131zM720 0c159 0 288 129 288 288 0 135-75 195-165 285L741 471c53-53 123-101 123-183 0-80-65-144-144-144-38 0-75 15-102 42L474 330c-27 27-42 64-42 102 0 56 33 108 84 131l-60 131c-102-47-168-150-168-262 0-76 31-150 84-204C476 125 562 0 720 0z"
    />
  </svg>
);
export default LinkIcon;