import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import ProfileLayout from './layouts/ProfileLayout'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import ForgotPassword from './views/auth/ForgotPassword'
import LoginView from './views/auth/LoginView'
import NewPasswordView from './views/auth/NewPasswordView'
import RequestNewCodeVIew from './views/auth/RequestNewCodeView'
import SignUpView from './views/auth/SignUpView'
import DashBoardView from './views/DashBoardView'
import ChangePasswordView from './views/Profile/ChangePasswordView'
import ProfileView from './views/Profile/ProfileView'
import CreateProjectView from './views/Projects/CreateProjectView'
import EditProjectView from './views/Projects/EditProjectView'
import ProjectDetailsView from './views/Projects/ProjectDetailsView'
import ProjectTeamView from './views/Projects/ProjectTeamView'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashBoardView />} index />
                    <Route path='/project/create' element={<CreateProjectView />} />
                    <Route path='/project/:projectId/edit' element={<EditProjectView />} />
                    <Route path='/project/:projectId' element={<ProjectDetailsView />} />
                    <Route path='/project/:projectId/team' element={<ProjectTeamView />} />

                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>




                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} index />
                    <Route path='/auth/register' element={<SignUpView />} index />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />} index />
                    <Route path='/auth/new-code' element={<RequestNewCodeVIew />} index />
                    <Route path='/auth/forgot-password' element={<ForgotPassword />} index />
                    <Route path='/auth/new-password' element={<NewPasswordView />} index />







                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router