export default function Loading() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <g fill="none" fillRule="evenodd">
        <g
          transform="translate(1 1)"
          strokeWidth="2"
          stroke="var(--loader-color)"
        >
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}
