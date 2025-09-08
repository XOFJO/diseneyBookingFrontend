import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HotelListPage from "./pages/HotelListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layout/Layout";
import HotelDetailPage from "./pages/HotelDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 定义路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelListPage />} />
          <Route path="/rooms" element={<HotelDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
  