import { useMutation } from "@tanstack/react-query";

import { addComicAction } from "@/actions/comic-actions";

export const useAddComicMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation({
    mutationFn: addComicAction,
    onSuccess,
    onError,
  });
};
