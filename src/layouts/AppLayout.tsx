import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"
import { useAuth } from "../hooks/useAuth"

function AppLayout() {
  const {data,isError, isLoading}= useAuth()

  if(isLoading) return "loading"
  if(isError){
    return <Navigate to={'/auth/login'}/>
  }
  if(data)return (
    <>
      <header
        className="bg-gray-800 py-5"
      >
        <div className="max-w-screen-2xl mx-auto  flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo/>

          </div>
            <NavMenu
            userName={data.userName}
            />
        </div>

      </header>
      <main className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </main>

      <footer className="py-5">
        <p className="text-center">
          All rights reserved {new Date().getFullYear()}

        </p>

      </footer>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

export default AppLayout