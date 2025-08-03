import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export type EntityTypes = "transactions";

export type QueryData = {
  id?: number;
  month?: string;
  date?: string;
  category?: string;
  type?: string;
};

export interface QueryRecord {
  entityName: EntityTypes;
  query?: QueryData;
}

const buildQueryKey = (entityName: EntityTypes, query?: QueryData) => {
  if (query) {
    return [entityName, query];
  } else {
    return [entityName];
  }
};

export const useApi = <T>(entityName: EntityTypes, query?: QueryData) => {
  const queryKey = buildQueryKey(entityName, query);

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        let uri = `${baseURL}/api/${entityName}`;

        if (query) {
          const params = new URLSearchParams();
          for (const key in query) {
            const value = query[key as keyof QueryData];
            if (value !== undefined && value !== null) {
              params.append(key, value.toString());
            }
          }

          const qs = params.toString();
          if (qs) {
            uri += `?${qs}`;
          }
        }

        const result = await axios.get(uri);
        return result.data as T;
      } catch (ex) {
        console.error("API fetch error:", ex);
        return [] as T;
      }
    },
  });
};

export const usePostApi = <T>(
  entityName: string
): UseMutationResult<T, Error, T, unknown> => {
  return useMutation<T, Error, T>({
    mutationFn: async (data: T) => {
      const res = await axios.post(`${baseURL}/api/${entityName}`, data);
      return res.data;
    },
  });
};

export const useMutateApi = <T>(entityName: EntityTypes) => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: T }) => {
      const uri = `${baseURL}/api/${entityName}?id=${id}`;
      const response = await axios.patch(uri, data);
      return response.data;
    },
    onError: (error) => {
      console.error("API patch error:", error);
    },
  });
};
