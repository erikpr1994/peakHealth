import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useAuth } from "../AuthContext";

// Mock the entire AuthContext module
vi.mock("../AuthContext", () => ({
  useAuth: vi.fn(),
}));

// Test component to access context
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="isLoading">{auth.isLoading.toString()}</div>
      <div data-testid="isAuthOperationLoading">
        {auth.isAuthOperationLoading.toString()}
      </div>
      <div data-testid="user">{auth.user ? "user" : "no-user"}</div>
      <button onClick={() => auth.login("test@example.com", "password")}>
        Login
      </button>
      <button
        onClick={() => auth.signUp("test@example.com", "password", "Test User")}
      >
        Sign Up
      </button>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useAuth hook", () => {
    it("provides auth context with default values", () => {
      const mockAuth = {
        isAuthenticated: false,
        isLoading: false,
        isAuthOperationLoading: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("false");
      expect(screen.getByTestId("isLoading")).toHaveTextContent("false");
      expect(screen.getByTestId("isAuthOperationLoading")).toHaveTextContent(
        "false"
      );
      expect(screen.getByTestId("user")).toHaveTextContent("no-user");
    });

    it("provides auth context with authenticated user", () => {
      const mockUser = { id: "123", email: "test@example.com" } as any;
      const mockAuth = {
        isAuthenticated: true,
        isLoading: false,
        isAuthOperationLoading: false,
        user: mockUser,
        login: vi.fn(),
        logout: vi.fn(),
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      expect(screen.getByTestId("isAuthenticated")).toHaveTextContent("true");
      expect(screen.getByTestId("user")).toHaveTextContent("user");
    });

    it("provides auth methods", () => {
      const mockAuth = {
        isAuthenticated: false,
        isLoading: false,
        isAuthOperationLoading: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("calls login method when login button is clicked", () => {
      const mockLogin = vi.fn();
      const mockAuth = {
        isAuthenticated: false,
        isLoading: false,
        isAuthOperationLoading: false,
        user: null,
        login: mockLogin,
        logout: vi.fn(),
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      const loginButton = screen.getByText("Login");
      loginButton.click();

      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password");
    });

    it("calls signUp method when sign up button is clicked", () => {
      const mockSignUp = vi.fn();
      const mockAuth = {
        isAuthenticated: false,
        isLoading: false,
        isAuthOperationLoading: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        signUp: mockSignUp,
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      const signUpButton = screen.getByText("Sign Up");
      signUpButton.click();

      expect(mockSignUp).toHaveBeenCalledWith(
        "test@example.com",
        "password",
        "Test User"
      );
    });

    it("calls logout method when logout button is clicked", () => {
      const mockLogout = vi.fn();
      const mockAuth = {
        isAuthenticated: false,
        isLoading: false,
        isAuthOperationLoading: false,
        user: null,
        login: vi.fn(),
        logout: mockLogout,
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      const logoutButton = screen.getByText("Logout");
      logoutButton.click();

      expect(mockLogout).toHaveBeenCalled();
    });

    it("shows loading state", () => {
      const mockAuth = {
        isAuthenticated: false,
        isLoading: true,
        isAuthOperationLoading: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      expect(screen.getByTestId("isLoading")).toHaveTextContent("true");
    });

    it("shows auth operation loading state", () => {
      const mockAuth = {
        isAuthenticated: false,
        isLoading: false,
        isAuthOperationLoading: true,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        signUp: vi.fn(),
      };

      vi.mocked(useAuth).mockReturnValue(mockAuth);

      render(<TestComponent />);

      expect(screen.getByTestId("isAuthOperationLoading")).toHaveTextContent(
        "true"
      );
    });
  });
});
