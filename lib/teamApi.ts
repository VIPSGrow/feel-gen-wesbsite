import serverCallFuction from "./constantFunction";
import type { TeamMember } from "./types/Team";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = (await serverCallFuction(
    "GET",
    "api/static/teamMember",
  )) as any;

  if (response.success && response.data) {
    return response.data.filter(
      (member: TeamMember) => member.status === "active",
    );
  }

  return [];
};
