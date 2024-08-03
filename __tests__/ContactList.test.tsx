import { getUserData, getTeamUsers, getMemberUsers } from "@/helpers/dbHelper";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

// Mock Firebase
jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  get: jest.fn(),
  query: jest.fn(),
  orderByChild: jest.fn(),
  equalTo: jest.fn(),
}));

jest.mock("@/lib/firebase", () => ({
  db: {},
}));

describe("dbHelper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserData", () => {
    it("should return user data when available", async () => {
      const mockSnapshot = {
        exists: () => true,
        val: () => [{ id: 1, name: "Test User" }],
      };
      (get as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await getUserData();
      expect(result).toEqual([{ id: 1, name: "Test User" }]);
      expect(ref).toHaveBeenCalledWith({}, "users");
      expect(get).toHaveBeenCalled();
    });

    it("should return null when no data available", async () => {
      const mockSnapshot = {
        exists: () => false,
      };
      (get as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await getUserData();
      expect(result).toBeNull();
    });
  });

  describe("getTeamUsers", () => {
    it("should return team users when available", async () => {
      const mockSnapshot = {
        exists: () => true,
        forEach: jest.fn((callback) => {
          callback({
            val: () => ({ id: 1, name: "Test Team", category: "team" }),
          });
        }),
      };
      (get as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await getTeamUsers();
      expect(result).toEqual([{ id: 1, name: "Test Team", category: "team" }]);
      expect(query).toHaveBeenCalled();
      expect(orderByChild).toHaveBeenCalledWith("category");
      expect(equalTo).toHaveBeenCalledWith("team");
    });

    it("should return empty array when no team users found", async () => {
      const mockSnapshot = {
        exists: () => false,
      };
      (get as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await getTeamUsers();
      expect(result).toEqual([]);
    });
  });

  describe("getMemberUsers", () => {
    it("should return member users when available", async () => {
      const mockSnapshot = {
        exists: () => true,
        forEach: jest.fn((callback) => {
          callback({
            val: () => ({ id: 1, name: "Test Member", category: "member" }),
          });
        }),
      };
      (get as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await getMemberUsers();
      expect(result).toEqual([
        { id: 1, name: "Test Member", category: "member" },
      ]);
      expect(query).toHaveBeenCalled();
      expect(orderByChild).toHaveBeenCalledWith("category");
      expect(equalTo).toHaveBeenCalledWith("member");
    });

    it("should return empty array when no member users found", async () => {
      const mockSnapshot = {
        exists: () => false,
      };
      (get as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await getMemberUsers();
      expect(result).toEqual([]);
    });
  });
});
