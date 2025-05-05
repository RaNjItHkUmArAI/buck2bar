// Filename: js/scripts.test.js
const usernameRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

describe("Username Validation Regex", () => {
  test("Valid username with all required criteria", () => {
    expect(usernameRegex.test("Valid@123")).toBe(true);
  });

  test("Invalid username - missing uppercase letter", () => {
    expect(usernameRegex.test("invalid@123")).toBe(false);
  });

  test("Invalid username - missing special character", () => {
    expect(usernameRegex.test("Invalid123")).toBe(false);
  });

  test("Invalid username - missing number", () => {
    expect(usernameRegex.test("Invalid@abc")).toBe(false);
  });

  test("Invalid username - less than 8 characters", () => {
    expect(usernameRegex.test("Val@1")).toBe(false);
  });

  test("Valid username with more than 8 characters", () => {
    expect(usernameRegex.test("Longer@1234")).toBe(true);
  });

  test("Invalid username - contains spaces", () => {
    expect(usernameRegex.test("Invalid @123")).toBe(false);
  });

  test("Invalid username - only special characters", () => {
    expect(usernameRegex.test("@@@@@@@@")).toBe(false);
  });

  test("Invalid username - only numbers", () => {
    expect(usernameRegex.test("12345678")).toBe(false);
  });

  test("Invalid username - only uppercase letters", () => {
    expect(usernameRegex.test("ABCDEFGH")).toBe(false);
  });
});
