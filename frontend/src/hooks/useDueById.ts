import { api } from "@/services/api";

async function useDueById(id: string) {
  const result = await api.get(`dues/${id}`);

  return result.data
};

export { useDueById }