import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    password: "",
    role: "",
    organization: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const fullName = `${form.lastName} ${form.firstName} ${form.middleName}`.trim();

    const payload = {
      email: form.email,
      fullName,
      password: form.password,
      role: form.role,
      organization: form.organization,
    };

    try {
      const response = await axios.post("/api/v1/auth/register", payload);
      const token = response.data.token;
      const decoded = jwtDecode(token);
      const role = decoded.role;

      setSuccess("Регистрация прошла успешно");
      localStorage.setItem("authToken", token);

      if (role === "STUDENT") {
        navigate("/student-dashboard");
      } else if (role === "ORGANIZATION_SUPERVISOR") {
        navigate("/organization-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка регистрации");
    }
  };

  return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Регистрация</h2>
          {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Почта</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Фамилия</label>
              <input name="lastName" type="text" required value={form.lastName} onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Имя</label>
              <input name="firstName" type="text" required value={form.firstName} onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Отчество</label>
              <input name="middleName" type="text" value={form.middleName} onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Пароль</label>
              <input name="password" type="password" required value={form.password} onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Название организации</label>
              <input
                  name="organization"
                  type="text"
                  required
                  value={form.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Роль</label>
              <select name="role" required value={form.role} onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Выберите роль</option>
                <option value="STUDENT">Студент</option>
                <option value="UNIVERSITY_SUPERVISOR">Руководитель вуза</option>
                <option value="ORGANIZATION_SUPERVISOR">Руководитель организации</option>
              </select>
            </div>

            <button type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
  );
}
