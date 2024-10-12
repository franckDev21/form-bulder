import { UserModel } from "@/models/user";
import { FieldLigneModel } from "@/models/ligne";

export interface FormModel {
    id: string;
    name: string;
    validated_at: string;
    user_validated: UserModel;
    author: UserModel;
    lignes: FieldLigneModel[];
    created_at: string;
    updated_at: string;
}