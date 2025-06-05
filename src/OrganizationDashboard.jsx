import { useEffect, useState } from "react";
import axios from "axios";

export default function OrganizationDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios.get("/api/v1/organization/students", {
      headers: {
        Authorization: `${token}`
      }
    })
    .then((res) => {
      const studentList = Array.isArray(res.data.students)
          ? res.data.students
          : [];
      setStudents(studentList);
    })
    .catch((err) => {
      console.error("Ошибка загрузки студентов", err);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
      <div className="bg-gray-100 text-gray-800 font-sans">
        <div className="min-h-screen flex flex-col">
          {/* Хедер */}
          <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-blue-800">
              Практика – Руководитель организации
            </h1>
            <button
                className="text-sm text-red-500 hover:text-red-600 font-medium"
                onClick={handleLogout}
            >
              Выйти
            </button>
          </header>

          {/* Контент */}
          <main className="flex flex-1 p-6 space-x-6">
            <div className="w-3/5 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">Добро пожаловать!</h2>
                <p className="text-sm text-gray-600">
                  Здесь вы можете управлять заданиями и проверять отчеты студентов.
                </p>
              </section>

              {/* Список студентов */}
              <section className="bg-white p-4 rounded-xl shadow">
                <h3 className="text-lg font-medium mb-4 text-blue-700">Студенты</h3>
                {students.length === 0 ? (
                    <p className="text-sm text-gray-500">Нет доступных студентов.</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                      <tr>
                        <th className="border-b pb-2 font-semibold">ФИО</th>
                      </tr>
                      </thead>
                      <tbody>
                      {students.map((student) => (
                          <tr key={student.studentId} className="hover:bg-gray-50">
                            <td className="py-2">{student.name}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                )}
              </section>
            </div>

            {/* Уведомления */}
            <aside className="w-2/5">
              <div className="bg-white p-4 rounded-xl shadow sticky top-6">
                <h3 className="text-lg font-medium mb-4 text-blue-700">Уведомления</h3>
                <ul className="space-y-3 text-sm">
                  <li className="border-b pb-2">📩 Новый отчет от Иванова И.И.</li>
                  <li className="border-b pb-2">⚠️ Отчет Петровой А.А. требует комментариев</li>
                  <li>✅ Отчет Сидорова М.М. отклонен</li>
                </ul>
              </div>
            </aside>
          </main>
        </div>
      </div>
  );
}
