import { z } from "zod";

const authSchema = z.object({
    userName: z.string(),
    email: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
    token: z.string(),
    currentPassword: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type SignUpForm = Pick<Auth, 'email' | 'password' | 'passwordConfirmation' | 'userName'>

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'passwordConfirmation'>

export type UpdateCurrentUserPasswordForm = Pick<Auth, 'password' | 'currentPassword'>


export type ConfirmToken = Pick<Auth, 'token'>

export type checkPasswordForm = Pick<Auth,'password'> 


const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy:
        z.object({
            _id: z.string(),
            email: z.string(),
            userName:z.string()
        })
    ,
    createdAt: z.string()

})

export type Note = z.infer<typeof noteSchema>

export type NoteFormData = Pick<Note, 'content'>



//Users
export const UserSchema = z.object({
    userName: z.string(),
    email: z.string(),
    _id: z.string(),
})

export type UserProfileForm = Pick<User,'email'|'userName'>
export type User = z.infer<typeof UserSchema>

export const taskStatusSchema = z.enum(["pending", "onHold", 'inProgress', 'underReview', 'completed'])

export type TaskStatus = z.infer<typeof taskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: z.object({
            _id: z.string(),
            email: z.string()
        }),
        status: taskStatusSchema
    })),
    notes: z.array(noteSchema.extend({
        createdBy: UserSchema
    }))

})

export type Task = z.infer<typeof TaskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export const taskProjectSchema = TaskSchema.pick({
    _id:true,
    name:true,
    description:true,
    status:true
})
export const ProjectSchema = z.object({
    description: z.string(),
    projectName: z.string(),
    _id: z.string(),
    clientName: z.string(),
    manager: z.string(),
    tasks: z.array(taskProjectSchema),
    team:z.array(z.string())

})
export const DashboardProjectSchema = z.array(ProjectSchema.pick({
    clientName: true,
    projectName: true,
    _id: true,
    description: true,
    manager: true
}))



export type TaskProject= z.infer<typeof taskProjectSchema>

export const editProjectSchema= ProjectSchema.pick({
    projectName:true,
    clientName:true,
    description:true
})


export type ProjectT = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<ProjectT, 'clientName' | 'description' | 'projectName'>

//
const TeamMemberSchema = UserSchema.pick({
    userName: true,
    email: true,
    _id: true
})


export const TeamMembersSchema = z.array(TeamMemberSchema)
export type TeamMember = z.infer<typeof TeamMemberSchema>

export type TeamMemberForm = Pick<TeamMember, 'email'>