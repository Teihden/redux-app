import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { Navbar } from "./components/Navbar";
import { SinglePostPage } from "@/features/posts/SinglePostPage";
import { PostsMainPage } from "@/features/posts/PostsMainPage";
import { EditPostForm } from "@/features/posts/EditPostForm";
import { selectCurrentUsername } from "./features/auth/authSlice";
import React from "react";
import { LoginPage } from "@/features/auth/LoginPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername);

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
