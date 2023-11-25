import { api } from "@/services/api";

async function useSendDue(formData: any) {
  const response = await api.post('dues', formData);

  return response.data;
}

export { useSendDue }