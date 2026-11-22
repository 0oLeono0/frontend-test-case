import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mockUser } from "../data/mockUser";
import { selectUser, setUser } from "../store/store";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(setUser(mockUser)), 500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {user ? <span>Привет, {user.name}!</span> : <span>Загрузка...</span>}
      </div>
    </header>
  );
}
