import type { ApiResponse } from "./types"; // Adjust if ApiResponse exists, else inline

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMembersApiResponse {
  success: boolean;
  count: number;
  data: TeamMember[];
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  // To be implemented in teamApi.ts
  return [];
};
