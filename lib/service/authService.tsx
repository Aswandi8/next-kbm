import instance from "../axios/instance";

type authParams = {
  username: string;
  email: string;
  password: string;
};
const authService = {
  getAllUsers: () => instance.get("/api/users"),
  signupService: (data: authParams) => instance.post("/api/auth/sign-up", data),
};
export default authService;
