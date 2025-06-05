export default function StudentDashboard() {
  return (
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-800">Практика – Студент</h1>
          <button className="text-sm text-red-500 hover:text-red-600 font-medium">Выйти</button>
        </header>

        <main className="flex flex-1 p-6 space-x-6">
          <div className="w-3/4 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Добро пожаловать, Иван!</h2>
              <p className="text-sm text-gray-600">Ниже отображаются ваши задания и статус текущего отчета.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-medium mb-4 text-blue-700">Мои задания</h3>
              <ul className="space-y-3">
                <li className="border p-3 rounded-md">
                  <p className="font-medium">1. Описание компании</p>
                  <p className="text-sm text-gray-500">
                    Статус: <span className="text-green-600">Выполнено</span>
                  </p>
                </li>
                <li className="border p-3 rounded-md">
                  <p className="font-medium">2. Ознакомление с документацией</p>
                  <p className="text-sm text-gray-500">
                    Статус: <span className="text-yellow-500">В процессе</span>
                  </p>
                </li>
                <li className="border p-3 rounded-md">
                  <p className="font-medium">3. Выполнение практического задания</p>
                  <p className="text-sm text-gray-500">
                    Статус: <span className="text-gray-400">Не начато</span>
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-medium mb-2 text-blue-700">Статус отчета</h3>
              <p className="text-gray-600">
                Отчет: <span className="font-semibold text-green-600">Ожидает проверки</span>
              </p>
            </div>

            <div>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition">
                Создать / Обновить отчет
              </button>
            </div>
          </div>

          <aside className="w-1/4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-medium mb-4 text-blue-700">Уведомления</h3>
              <ul className="space-y-3 text-sm">
                <li className="border-b pb-2">Новый комментарий от руководителя.</li>
                <li className="border-b pb-2">Задание 1 проверено.</li>
                <li>Отчет принят университетским руководителем.</li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
  );
}
