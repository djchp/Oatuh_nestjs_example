import { Provider } from 'src/utils/types/user.types';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
