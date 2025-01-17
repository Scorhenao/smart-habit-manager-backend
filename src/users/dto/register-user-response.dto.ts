export class RegisterUserResponseDto {
  constructor(
    public status: number,
    public data: {
      id: string;
      name: string;
      email: string;
      cellphone: string;
    },
    public message: string,
  ) {}
}
