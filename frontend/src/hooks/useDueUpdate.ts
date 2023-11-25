import { api } from "@/services/api";

async function useDueUpdate(id: string, formData: any) {
  const result = await api.patch(`dues/${id}`, formData);

  return result.data
};

export { useDueUpdate }