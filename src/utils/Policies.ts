import { ProjectT, TeamMember } from "../types";

export const isManager = (managerId: ProjectT['manager'],userId: TeamMember['_id'])=>{

    return managerId=== userId
}