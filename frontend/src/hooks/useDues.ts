import { api } from "@/services/api";

async function useDues() {
  const result = await api.get("dues");

  return result.data
};

export { useDues }