import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Редирект, если уже авторизован как ORGANIZATION_SUPERVISOR
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "ORGANIZATION_SUPERVISOR") {
          navigate("/organization-dashboard");
        }
      } catch (e) {
        console.error("Невалидный токен", e);
        localStorage.removeItem("authToken"); // если токен битый, удалим
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/v1/auth/login", form);
      const token = response.data.token;

      localStorage.setItem("authToken", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "STUDENT") {
        navigate("/student-dashboard");
      } else if (role === "UNIVERSITY_SUPERVISOR") {
        navigate("/university-dashboard");
      } else if (role === "ORGANIZATION_SUPERVISOR") {
        navigate("/organization-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при входе");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
            Вход в систему
          </h2>

          {error && (
              <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Почта
              </label>
              <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Пароль
              </label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-semibold">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
  );
}
