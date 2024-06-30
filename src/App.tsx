import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import AuthLayout from "@/layouts/auth-layout"
import LoginPage from "@/pages/auth/login"
import HomePage from "@/pages/home"
import BlogsPage from "@/pages/blogs"
import CreateBlog from "@/pages/blogs/create-blog"

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
              element: <CreateBlog />,
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
