import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";

// Mock the auth context
const mockLogin = vi.fn();
const mockSignUp = vi.fn();
const mockLogout = vi.fn();
const mockIsAuthOperationLoading = false;

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    signUp: mockSignUp,
    logout: mockLogout,
    isAuthOperationLoading: mockIsAuthOperationLoading,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock fetch globally
global.fetch = vi.fn();

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const renderWithAuth = (component: React.ReactElement) => {
  return render(component);
};

describe("Auth Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockReset();
  });

    describe("Login Flow", () => {
    it("successfully logs in a user", async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce(undefined);

      renderWithAuth(<LoginPage />);
      
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Sign In" });
      
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      });
    });

    it("handles login failure and shows error", async () => {
      const user = userEvent.setup();
      const errorMessage = "Invalid credentials";
      mockLogin.mockRejectedValueOnce(new Error(errorMessage));

      renderWithAuth(<LoginPage />);
      
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Sign In" });
      
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "wrongpassword");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

    describe("Sign Up Flow", () => {
    it("successfully signs up a new user", async () => {
      const user = userEvent.setup();
      mockSignUp.mockResolvedValueOnce(undefined);

      renderWithAuth(<SignUpPage />);
      
      const nameInput = screen.getByLabelText("Name");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: "Sign Up" });
      
      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password123");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith("john@example.com", "password123", "John Doe");
      });
    });

    it("validates password confirmation during signup", async () => {
      const user = userEvent.setup();
      
      renderWithAuth(<SignUpPage />);
      
      const nameInput = screen.getByLabelText("Name");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: "Sign Up" });
      
      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "differentpassword");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
      });
      
      // Should not call the signup function
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it("handles signup failure and shows error", async () => {
      const user = userEvent.setup();
      const errorMessage = "Email already exists";
      mockSignUp.mockRejectedValueOnce(new Error(errorMessage));

      renderWithAuth(<SignUpPage />);
      
      const nameInput = screen.getByLabelText("Name");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: "Sign Up" });
      
      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "existing@example.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password123");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  describe("Navigation Between Auth Pages", () => {
    it("navigates from login to signup", () => {
      renderWithAuth(<LoginPage />);

      const signUpLink = screen.getByText("Don't have an account? Sign up");
      expect(signUpLink.closest("a")).toHaveAttribute("href", "/signup");
    });

    it("navigates from signup to login", () => {
      renderWithAuth(<SignUpPage />);

      const signInLink = screen.getByText("Already have an account? Sign in");
      expect(signInLink.closest("a")).toHaveAttribute("href", "/login");
    });
  });

    describe("Form Validation", () => {
    it("validates required fields on login", async () => {
      const user = userEvent.setup();
      
      renderWithAuth(<LoginPage />);
      
      const submitButton = screen.getByRole("button", { name: "Sign In" });
      await user.click(submitButton);
      
      // Form should not submit due to HTML5 validation
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it("validates required fields on signup", async () => {
      const user = userEvent.setup();
      
      renderWithAuth(<SignUpPage />);
      
      const submitButton = screen.getByRole("button", { name: "Sign Up" });
      await user.click(submitButton);
      
      // Form should not submit due to HTML5 validation
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it("validates email format on login", async () => {
      const user = userEvent.setup();
      
      renderWithAuth(<LoginPage />);
      
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Sign In" });
      
      await user.type(emailInput, "invalid-email");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);
      
      // Form should not submit due to HTML5 validation
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it("validates email format on signup", async () => {
      const user = userEvent.setup();
      
      renderWithAuth(<SignUpPage />);
      
      const nameInput = screen.getByLabelText("Name");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: "Sign Up" });
      
      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "invalid-email");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password123");
      await user.click(submitButton);
      
      // Form should not submit due to HTML5 validation
      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });

    describe("Error Handling", () => {
    it("handles network errors during login", async () => {
      const user = userEvent.setup();
      
      // Mock network error
      mockLogin.mockRejectedValueOnce(new Error("Network error"));

      renderWithAuth(<LoginPage />);
      
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const submitButton = screen.getByRole("button", { name: "Sign In" });
      
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText("Network error")).toBeInTheDocument();
      });
    });

    it("handles network errors during signup", async () => {
      const user = userEvent.setup();
      
      // Mock network error
      mockSignUp.mockRejectedValueOnce(new Error("Network error"));

      renderWithAuth(<SignUpPage />);
      
      const nameInput = screen.getByLabelText("Name");
      const emailInput = screen.getByLabelText("Email");
      const passwordInput = screen.getByLabelText("Password");
      const confirmPasswordInput = screen.getByLabelText("Confirm Password");
      const submitButton = screen.getByRole("button", { name: "Sign Up" });
      
      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(passwordInput, "password123");
      await user.type(confirmPasswordInput, "password123");
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText("Network error")).toBeInTheDocument();
      });
    });
  });
});
