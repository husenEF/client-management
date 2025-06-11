export interface AuthRequest {
  user: {
    id: string;
    sub: string;
    name: string;
  };
}
