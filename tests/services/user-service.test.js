import UserService from "../../src/services/user-service.js";
import UserRepository from "../../src/repository/user-repository.js";

jest.mock("../../src/repository/user-repository.js");

describe("user service signup test", () => {
  test("should successfully create a user", async () => {
    const data = {
      email: "abc@gmail.com",
      password: "123456",
    };
    UserRepository.prototype.create.mockReturnValue({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const service = new UserService();
    const response = await service.signup();
    expect(response.email).toBe(data.email);
  });
});
