export class AuthResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    avatar: string;
    surname: string;
  };
  accessToken: string;
  expires: string;
}
