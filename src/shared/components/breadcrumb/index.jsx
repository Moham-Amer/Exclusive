import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation, Link as RouterLink } from 'react-router-dom';

function toTitleCase(segment) {
  if (!segment) return '';
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
}

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Special-case numeric ids -> "Details"
  const labelFor = (segment) => {
    if (/^\d+$/.test(segment)) return 'Details';
    return toTitleCase(segment);
  };

  const crumbs = [
    { name: 'Home', to: '/' },
    ...pathnames.map((segment, index) => {
      const to = '/' + pathnames.slice(0, index + 1).join('/');
      return { name: labelFor(segment), to };
    }),
  ];

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#000', backgroundColor: '#ffff' ,fontSize: '16px', fontWeight: 500}}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return isLast ? (
            <Typography key={crumb.to} sx={{ color: 'text.primary' }}>{crumb.name}</Typography>
          ) : (
            <Link
              key={crumb.to}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={crumb.to}
            >
              {crumb.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
