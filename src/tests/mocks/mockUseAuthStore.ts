import { useAuthStore } from "hooks/AuthStoreHook";
import { User } from "shared/interfaces";
import { mocked } from "ts-jest/utils";

export function mockAuthStore(): void {
  const mockUser: User = {
    id: "id",
    host: "host",
    displayName: "name",
    url: "url",
    profileColor: "black",
    profileImage: undefined,
    username: "username",
  };
  jest.doMock("hooks/AuthStoreHook", () => {
    return {
      __esModule: true,
      useAuthStore: jest.fn().mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        setIsAuthenticated: jest.fn(),
        setUser: jest.fn(),
      }),
    };
  });
  mocked(useAuthStore).mockReturnValue({
    user: mockUser,
    isAuthenticated: true,
    setIsAuthenticated: jest.fn(),
    setUser: jest.fn(),
  });
}
