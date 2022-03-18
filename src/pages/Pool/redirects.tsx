import { Redirect, RouteComponentProps } from 'react-router-dom'

// Redirects to swap but only replace the pathname
export function RedirectPathToPoolOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/pool' }} />
}
