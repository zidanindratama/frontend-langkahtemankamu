import axiosInstance from "@/helpers/axioosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type fetchProps = {
  queryKey: [string, string] | [string];
  dataProtected: string;
  keep?: boolean;
};

export const useFetchData = ({ queryKey, dataProtected, keep }: fetchProps) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isStale,
  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await axiosInstance.get(`/protected/${dataProtected}`),
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    isError,
    isStale,
    isSuccess,
    refetch,
    isRefetching,
  };
};
