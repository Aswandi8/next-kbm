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

type profileParams = {
  id: string;
  photo: string;
};
const authService = {
  getAllUsers: () => instance.get("/api/users"),
  getProfile: (token: string) =>
    instance.get("/api/auth/profile", {
      headers: {
        Authorization: token,
      },
    }),
  updateImageProfile: (data: profileParams) =>
    instance.patch(`/api/auth/profile/${data.id}`, data),
  updateUser: (data: updateParams) =>
    instance.patch(`/api/users/${data.email}`, data),
  signupService: (data: authParams) => instance.post("/api/auth/sign-up", data),
};
export default authService;
