declare module 'react-router-dom' {
    export interface RouteProps {
      path: string;
      element: React.ReactNode;
      className?: string;
    }
  
    export const BrowserRouter: React.FC<{ children: React.ReactNode }>;
    export const Routes: React.FC<{ children: React.ReactNode }>;
    export const Route: React.FC<RouteProps>;
    export const Link: React.FC<{ to: string; children: React.ReactNode }>;
    
    export function useNavigate(): (to: string) => void;
    export function useParams<Params extends { [K in keyof Params]?: string } = {}>(): Params;
  }