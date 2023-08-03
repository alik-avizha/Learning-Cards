import { MemoryRouter } from 'react-router-dom'

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
  return <MemoryRouter>{storyFn()}</MemoryRouter>
}
