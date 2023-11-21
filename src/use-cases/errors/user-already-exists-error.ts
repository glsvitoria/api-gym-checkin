export class UserAlreadyExistsError extends Error {
  constructor() {
    super("User with same email already exists.");
  }
}