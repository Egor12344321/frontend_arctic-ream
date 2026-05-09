import MyMetricsPage from "../pages/MyMetricsPage";
import { chartsApi, expeditionApi, analyticsApi, dashboardApi } from "../api/ArcticApi";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  BubbleController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  BubbleController,
  Title,
  Tooltip,
  Legend,
  Filler
);
const mockSessions = [
  {
    date: "2026-05-01",
    timeOfDay: "утро",
    alpha: 0.45,
    beta: 0.32,
    theta: 0.18,
    smr: 0.05,
    totalCognitive: 25,
    totalPhysiological: 30,
    totalPsychological: 20,
    attention: 65,
    cognitiveLoad: 40,
    selfControl: 70,
    cognitiveControl: 60,
    productivity: 0.75,
    objectiveCognitive: 80,
    objectivePhysiological: 75,
    objectivePsychological: 85,
    subjectiveCognitive: 70,
    subjectivePhysiological: 65,
    subjectivePsychological: 75,
    totalIndex: 28,
    stress: 35,
    fatigue: 30,
    concentration: 72,
    relax: 68,
  },
  {
    date: "2026-05-02",
    timeOfDay: "вечер",
    alpha: 0.38,
    beta: 0.41,
    theta: 0.15,
    smr: 0.06,
    totalCognitive: 35,
    totalPhysiological: 40,
    totalPsychological: 30,
    attention: 58,
    cognitiveLoad: 52,
    selfControl: 62,
    cognitiveControl: 55,
    productivity: 0.68,
    objectiveCognitive: 72,
    objectivePhysiological: 68,
    objectivePsychological: 78,
    subjectiveCognitive: 65,
    subjectivePhysiological: 60,
    subjectivePsychological: 70,
    totalIndex: 35,
    stress: 42,
    fatigue: 38,
    concentration: 65,
    relax: 62,
  },
  {
    date: "2026-05-03",
    timeOfDay: "утро",
    alpha: 0.42,
    beta: 0.36,
    theta: 0.20,
    smr: 0.07,
    totalCognitive: 30,
    totalPhysiological: 35,
    totalPsychological: 25,
    attention: 70,
    cognitiveLoad: 38,
    selfControl: 75,
    cognitiveControl: 65,
    productivity: 0.72,
    objectiveCognitive: 78,
    objectivePhysiological: 72,
    objectivePsychological: 82,
    subjectiveCognitive: 68,
    subjectivePhysiological: 62,
    subjectivePsychological: 72,
    totalIndex: 30,
    stress: 30,
    fatigue: 28,
    concentration: 75,
    relax: 70,
  },
];

const mockExpedition = {
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
};

export default {
  title: "Pages/MyMetricsPage",
  component: MyMetricsPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      dashboardApi.getDashboardData = async () => mockSessions;
      chartsApi.getChartImage = async () => "https://via.placeholder.com/800x400";
      expeditionApi.getMyExpeditions = async () => ({
        asLeader: [mockExpedition],
        asParticipant: [],
      });
      expeditionApi.getExpeditionDetails = async () => mockExpedition;
      analyticsApi.getAdvice = async () => ({
        response: "Рекомендуется увеличить время отдыха между нагрузками. Наблюдается повышенный уровень усталости к концу дня. Обратите внимание на режим сна и питания.",
      });

      const mockStorage = {
        getItem: (key) => {
          if (key === "userEmail") return "ivan@arctic.ru";
          if (key === "individualNumber") return "ARCTIC-001";
          if (key === "userRoles") return JSON.stringify(["ROLE_LEADER"]);
          if (key === "accessToken") return "mock-token-123";
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
        <MemoryRouter initialEntries={["/expeditions/1/my-metrics"]}>
          <Routes>
            <Route path="/expeditions/:expeditionId/my-metrics" element={<Story />} />
            <Route path="/expeditions/:expeditionId" element={<div />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
};

export const Default = {};