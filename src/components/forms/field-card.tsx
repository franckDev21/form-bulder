'use client';

import { FieldType } from "@/types/form"
import { Pen, Trash2 } from "lucide-react";
import { FC } from "react";

interface FieldCardProps {
  field: FieldType;
  handleEditField: () => void;
  handleDeleteField: () => void;
}

const FieldCard: FC<FieldCardProps> = ({ field,  handleEditField, handleDeleteField }) => {
  return (
    <div className=' space-y-2 w-full'>
      <span>{field.name}</span>
      <div className='px-4 py-2 w-full rounded-md bg-slate-100 flex items-center justify-between'>
        <span>{field.placeholder}</span>
        <span className=" space-x-1 inline-flex items-center">
          <span onClick={handleEditField} className='p-2 cursor-pointer bg-white border rounded-full'><Pen size={17} /></span>
          <span title="Supprimer le champs ?" onClick={handleDeleteField} className='p-2 cursor-pointer bg-white transition-all hover:bg-red-500 hover:text-white border rounded-full'><Trash2 className='' size={17} /></span>
        </span>
      </div>
    </div>
  )
}

export default FieldCard