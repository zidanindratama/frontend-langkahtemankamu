import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/helpers/axioosInstance";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  backUrl?: string;
};

export const useDeleteData = ({
  queryKey,
  dataProtected,
  backUrl,
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation: any = useMutation<any>({
    mutationFn: (deleteData: any) => {
      return axiosInstance.delete(`/protected/${dataProtected}`, deleteData);
    },
    onMutate: (variables) => {
      toast(
        <>
          <p className="flex gap-x-2 items-center">
            <LoaderCircle className="animate-spin h-4 w-4" />
            Deleting the data...
          </p>
        </>
      );
    },
    onError: (error: any, variables, context) => {
      toast.error(`${error.response.data.message}`);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully delete the data!");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
