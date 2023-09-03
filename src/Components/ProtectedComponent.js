import { Navigate } from "react-router-dom";
export default function ProtectedComponent({ loggedIn, children }) {
  if (loggedIn) return children;
  else Navigate("/login");
}
