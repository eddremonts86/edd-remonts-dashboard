interface LogoProps {
  className?: string;
}

/**
 * Inline SVG logo that uses `currentColor` for theme-aware rendering.
 * On light theme, inherits dark text color; on dark theme, inherits light text color.
 * The orange-to-pink gradient stays consistent across themes.
 */
export const Logo = ({ className = '' }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1280 420"
    role="img"
    aria-labelledby="logo-title logo-desc"
    className={className}
  >
    <title id="logo-title">Inerarte — Eduardo</title>
    <desc id="logo-desc">
      Bold condensed stamp logo with angular slash and editorial tech energy.
    </desc>
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#FB7185" />
      </linearGradient>
    </defs>
    <g transform="translate(66 62)">
      <rect
        x="0"
        y="0"
        width="312"
        height="292"
        rx="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
      />
      <path d="M88 236L214 60h66L154 236z" fill="url(#logo-gradient)" />
      <path d="M36 246H274" stroke="currentColor" strokeWidth="12" />
      <path d="M40 88H144" stroke="currentColor" strokeWidth="12" />
      <path d="M172 88H270" stroke="currentColor" strokeWidth="12" opacity="0.42" />
    </g>
    <g transform="translate(430 96)">
      <text
        x="0"
        y="80"
        fill="currentColor"
        fontSize="96"
        fontWeight="900"
        fontFamily="Arial Narrow, Impact, Haettenschweiler, Arial, sans-serif"
        letterSpacing="2"
      >
        INERARTE
      </text>
      <text
        x="2"
        y="156"
        fill="url(#logo-gradient)"
        fontSize="48"
        fontWeight="900"
        fontFamily="Arial Narrow, Impact, Haettenschweiler, Arial, sans-serif"
        letterSpacing="10"
      >
        EDUARDO
      </text>
      <path d="M0 194H640" stroke="currentColor" strokeWidth="14" opacity="0.3" />
      <text
        x="0"
        y="244"
        fill="currentColor"
        fontSize="26"
        fontWeight="700"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        letterSpacing="5"
        opacity="0.6"
      >
        SENIOR FULL-STACK / FRONTEND ENGINEER
      </text>
    </g>
  </svg>
);
