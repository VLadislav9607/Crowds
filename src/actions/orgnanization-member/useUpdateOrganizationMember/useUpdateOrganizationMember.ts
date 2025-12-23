import { useMutation } from "@tanstack/react-query";
import { updateOrganizationMemberAction } from "./action";
import { IMutationOptions } from "@services";
import { UpdateOrganizationMemberRespDto } from "./types";

export const useUpdateOrganizationMember = (
    options?: IMutationOptions<UpdateOrganizationMemberRespDto>,
) => {
    return useMutation({
        mutationFn: updateOrganizationMemberAction,
        ...options,
    });
};
