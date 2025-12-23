import { useMutation } from "@tanstack/react-query";
import { createOrganizationAndCreatorAction } from "./action";
import { IMutationOptions } from "@services";
import { CreateOrganizationResDto } from "./types";

export const useCreateOrganizationAndCreator = (
    options?: IMutationOptions<CreateOrganizationResDto>,
) => {
    return useMutation({
        mutationFn: createOrganizationAndCreatorAction,
        ...options,
    });
};
