import { Redirect, RouteComponentProps } from 'react-router-dom'

// Redirects to swap but only replace the pathname
export function RedirectPathToTestOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/app' }} />
}
