import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const AuthCheck = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const user = useSelector((state) => state.auth.currentUser);

  if (typeof window !== undefined) {
    if (user === null && !localStorage.getItem("Token")) {
      enqueueSnackbar("Bạn chưa đăng nhập!", {
        variant: "error",
        autoHideDuration: 2000,
      });
      router.push("/");
    }
  }

  return props.children;
};

export default AuthCheck;
