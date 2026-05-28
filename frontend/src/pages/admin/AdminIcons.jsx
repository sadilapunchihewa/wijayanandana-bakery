export function Icon({ name, className = '' }) {
  const common = {
    className: `h-5 w-5 ${className}`,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24',
  }

  const paths = {
    dashboard: <><path d="M4 13h6V4H4z" /><path d="M14 20h6V4h-6z" /><path d="M4 20h6v-3H4z" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    box: <><path d="M21 8 12 3 3 8l9 5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
    orders: <><path d="M7 3h10l2 4v14H5V7z" /><path d="M7 7h10" /><path d="M9 12h6" /><path d="M9 16h4" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    star: <path d="m12 3 2.8 5.67 6.2.9-4.5 4.38 1.06 6.17L12 17.2l-5.56 2.92 1.06-6.17L3 9.57l6.2-.9z" />,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-2 3.46-.08-.02a1.7 1.7 0 0 0-1.84.4 1.7 1.7 0 0 0-.42 1.84l.02.08h-4l.02-.08a1.7 1.7 0 0 0-.42-1.84 1.7 1.7 0 0 0-1.84-.4l-.08.02-2-3.46.06-.06A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 13.8H2.9v-3.6H3A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06 2-3.46.08.02a1.7 1.7 0 0 0 1.84-.4 1.7 1.7 0 0 0 .42-1.84L8.52 1.3h4l-.02.08a1.7 1.7 0 0 0 .42 1.84 1.7 1.7 0 0 0 1.84.4l.08-.02 2 3.46-.06.06A1.7 1.7 0 0 0 19.4 9 1.7 1.7 0 0 0 21 10.2h.1v3.6H21A1.7 1.7 0 0 0 19.4 15Z" /></>,
    logout: <><path d="M10 17 15 12l-5-5" /><path d="M15 12H3" /><path d="M21 3v18" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    trash: <><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 15H6L5 6" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /></>,
  }

  return <svg {...common}>{paths[name] || paths.dashboard}</svg>
}
