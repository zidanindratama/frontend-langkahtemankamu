import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/helpers/axioosInstance";

type fetchProps = {
  queryKey: string;
  dataProtected: string;
  backUrl?: string;
  multipart?: boolean;
};

export const useAddData = ({
  queryKey,
  dataProtected,
  backUrl,
  multipart = false,
}: fetchProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation: any = useMutation<any>({
    mutationFn: (addData: any) => {
      if (multipart === false) {
        return axiosInstance.post(`/protected/${dataProtected}`, addData);
      }
      return axiosInstance.post(`/protected/${dataProtected}`, addData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onMutate: (variables) => {
      toast(
        <>
          <p className="flex gap-x-2 items-center">
            <LoaderCircle className="animate-spin h-4 w-4" />
            Adding the data...
          </p>
        </>
      );
    },
    onError: (error: any, variables, context) => {
      console.log(error);

      toast.error(`${error.response.data.message}`);
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully added the data!");

      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (backUrl) {
        router.push(backUrl);
      }
    },
  });

  return mutation;
};
