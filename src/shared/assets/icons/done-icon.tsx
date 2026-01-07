const DoneIcon = ({ color = 'currentColor', size = 24, className = '', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C16.9706 3 21 7.02943 21 12Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M8.84424 12.2018L10.4055 13.7632C10.862 14.2197 11.6021 14.2197 12.0585 13.7632L15.5247 10.2968"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default DoneIcon;
