const CrossIcon = ({ color = 'currentColor', size = 24, className = '', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    {...rest}
  >
    <path
      fill={color}
      d="m16.744 8.288-8.486 8.485c-.29.29-.77.29-1.06 0a.755.755 0 0 1 0-1.06l8.485-8.486c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06Z"
    />
    <path
      fill={color}
      d="M16.744 16.773c-.29.29-.771.29-1.06 0L7.197 8.288a.755.755 0 0 1 0-1.061c.29-.29.77-.29 1.06 0l8.486 8.485c.29.29.29.77 0 1.06Z"
    />
  </svg>
);

export default CrossIcon;
