import DashboardPage from "../pages/DashboardPage";
import { expeditionApi, authApi, userApi } from "../api/ArcticApi";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockExpeditions = {
  asLeader: [
    {
      id: 1,
      name: "Арктическая экспедиция 2026",
      description: "Изучение ледников и сбор образцов",
      startDate: "2026-06-15T00:00:00",
      endDate: "2026-08-20T00:00:00",
      role: "LEADER",
      leaderFirstName: "Иван",
      leaderLastName: "Петров",
      leaderEmail: "ivan@arctic.ru",
      createdAt: "2026-01-10T12:00:00",
    },
    {
      id: 2,
      name: "Экспедиция на Северный полюс",
      description: "Исследование климатических изменений",
      startDate: "2026-07-01T00:00:00",
      endDate: "2026-09-15T00:00:00",
      role: "LEADER",
      leaderFirstName: "Иван",
      leaderLastName: "Петров",
      leaderEmail: "ivan@arctic.ru",
      createdAt: "2026-02-15T12:00:00",
    },
  ],
  asParticipant: [
    {
      id: 3,
      name: "Гренландская экспедиция",
      description: "Изучение ледникового покрова",
      startDate: "2026-05-10T00:00:00",
      endDate: "2026-06-20T00:00:00",
      role: "USER",
      leaderFirstName: "Петр",
      leaderLastName: "Сидоров",
      leaderEmail: "petr@arctic.ru",
      createdAt: "2026-03-20T12:00:00",
    },
  ],
};

export default {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      expeditionApi.getMyExpeditions = () => Promise.resolve(mockExpeditions);
      expeditionApi.getExpeditionParticipants = () => Promise.resolve([]);
      expeditionApi.deleteExpedition = () => Promise.resolve();
      expeditionApi.editExpedition = () => Promise.resolve();
      expeditionApi.addParticipant = () => Promise.resolve();
      expeditionApi.removeParticipant = () => Promise.resolve();
      expeditionApi.leaveExpedition = () => Promise.resolve();
      expeditionApi.createExpedition = () => Promise.resolve({ id: 999 });
      
      authApi.logout = () => Promise.resolve();
      
      userApi.searchByIndividualNumber = () => Promise.resolve({
        firstName: "Иван",
        lastName: "Петров",
        email: "ivan@arctic.ru",
        individualNumber: "ARCTIC-001",
      });

      const mockStorage = {
        getItem: (key) => {
          if (key === "userEmail") return "ivan@arctic.ru";
          if (key === "individualNumber") return "ARCTIC-001";
          if (key === "userRoles") return JSON.stringify(["ROLE_ADMIN", "ROLE_LEADER"]);
          if (key === "accessToken") return "mock-token-123456";
          return null;
        },
        setItem: () => {},
        removeItem: () => {},
      };

      Object.defineProperty(global, "localStorage", {
        value: mockStorage,
        writable: true,
        configurable: true,
      });

      return (
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route path="/dashboard" element={<Story />} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/admin" element={<div>Admin Page</div>} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
};

export const Default = {};