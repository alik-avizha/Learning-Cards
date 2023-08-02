import { BrowserRouter } from 'react-router-dom'

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
  return <BrowserRouter>{storyFn()}</BrowserRouter>
}
