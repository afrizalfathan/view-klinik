import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import CreateQueue from "./pages/CreateQueue";
import DetailsQueue from "./pages/DetailsQueue";
import AdminNav from "./components/AdminNav";
import ReadQueues from "./pages/ReadQueues";
import CreateConsult from "./pages/CreateConsult";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import ReadKonsultasi from "./pages/ReadKonsultasi";
import DetailsKonsul from "./pages/DetailsKonsul";
import CheckKonsul from "./pages/CheckKonsul";
import QueueDisplay from "./components/QueueDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="queue" element={<CreateQueue />} />
          <Route path="login" element={<Login />} />
          <Route path="konsul" element={<CreateConsult />} />
          <Route path="queue/details/:id" element={<DetailsQueue />} />
          <Route path="queue/queue_display" element={<QueueDisplay />} />
          <Route path="konsul/details/:id" element={<CheckKonsul />} />
        </Route>
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminNav />
            </ProtectedRoute>
          }
        >
          <Route
            path="antrianControl"
            element={
              <ProtectedRoute>
                <ReadQueues />
              </ProtectedRoute>
            }
          />
          <Route
            path="konsultasi"
            element={
              <ProtectedRoute>
                <ReadKonsultasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="konsultasi/konsul_details/:id"
            element={
              <ProtectedRoute>
                <DetailsKonsul />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
