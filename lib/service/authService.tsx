import instance from "../axios/instance";

type authParams = {
  username: string;
  email: string;
  password: string;
};
type updateParams = {
  email: string;
  role: string;
};
const authService = {
  getAllUsers: () => instance.get("/api/users"),
  updateUser: (data: updateParams) =>
    instance.patch(`/api/users/${data.email}`, data),
  signupService: (data: authParams) => instance.post("/api/auth/sign-up", data),
};
export default authService;
