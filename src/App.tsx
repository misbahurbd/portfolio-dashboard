import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import AuthLayout from "@/layouts/auth-layout"
import LoginPage from "@/pages/auth/login"
import HomePage from "@/pages/home"
import BlogsPage from "@/pages/blogs"
import CreateBlogPage from "@/pages/blogs/create-blog"
import ProjectsPage from "@/pages/projects"
import CreateProjectPage from "@/pages/projects/create-project"
import EducationPage from "@/pages/educations"
import CreateEducationPage from "@/pages/educations/create-education"
import EditProjectPage from "./pages/projects/edit-project"
import EditEducationPage from "./pages/educations/edit-education"
import EditBlogPage from "./pages/blogs/edit-blog"

const App = () => {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "blogs",
          children: [
            {
              index: true,
              element: <BlogsPage />,
            },
            {
              path: "create",
              element: <CreateBlogPage />,
            },
            {
              path: "edit/:id",
              element: <EditBlogPage />,
            },
          ],
        },
        {
          path: "projects",
          children: [
            {
              index: true,
              element: <ProjectsPage />,
            },
            {
              path: "create",
              element: <CreateProjectPage />,
            },
            {
              path: "edit/:id",
              element: <EditProjectPage />,
            },
          ],
        },
        {
          path: "educations",
          children: [
            {
              index: true,
              element: <EducationPage />,
            },
            {
              path: "create",
              element: <CreateEducationPage />,
            },
            {
              path: "edit/:id",
              element: <EditEducationPage />,
            },
          ],
        },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
export default App
