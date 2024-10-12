import { FieldModel } from "@/models/field";

export interface FieldLigneModel {
    id: string;
    column_count: number;
    fields: FieldModel[];
}