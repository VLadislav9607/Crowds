import { supabase } from "@services";
import { UseCheckUsernameExistBodyDto, UseCheckUsernameExistResDto } from "./types";

export const useCheckUsernameExistAction = async (body: UseCheckUsernameExistBodyDto): Promise<UseCheckUsernameExistResDto> => {
    const {data, error} = await supabase.rpc('check_user_exists_by_username', {username_param: body.username})

    if (error) {
        throw error;
    }

    return {isExists: data};
}   