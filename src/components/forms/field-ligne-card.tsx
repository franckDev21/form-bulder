import { FieldLigneType, FieldType } from "@/types/form"
import { FC } from "react";
import FieldCard from "./field-card";

interface FieldLigneCardProps {
  ligne: FieldLigneType;
  handleAddField: () => void;
  deleteLine: () => void;
  handleEditField: (field: FieldType) => void;
  handleDeleteField: (fieldId: number, ligneId: number) => void;
}

const FieldLigneCard: FC<FieldLigneCardProps> = ({ ligne , handleAddField, handleEditField, deleteLine, handleDeleteField}) => {
  return (
    <div className="bg-white rounded-md p-4 border">
      <header className='text-end flex justify-end'>
        <button onClick={handleAddField} type='button' className={`px-3 py-1 bg-gray-200 text-xs ${ligne.column_count > 1 && 'opacity-50 cursor-none pointer-events-none'}`}>Ajouter un champs</button>
        <button onClick={deleteLine} type='button' className={`px-3 py-1 bg-red-200 text-red-500 text-xs`}>Supprimer la ligne</button>
      </header>
      <div className='p-2 border border-dashed'>
        {ligne.fields.length === 0 && 
          <div className=' flex flex-col justify-center items-center'>
            <h2 className='text-sm font-semibold text-gray-700'>Aucun champs de formulaire</h2>
            <span className=' text-xs italic text-gray-500'>Cliquez sur le bouton <strong>'Ajouter'</strong> pour ajouter un nouveau champs </span>
          </div>
        }

        <div className={`grid gap-4 grid-cols-${ligne.column_count}`}>
          {ligne.fields.map((field) => (
            <FieldCard 
              handleEditField={() => handleEditField(field)} 
              handleDeleteField={() => handleDeleteField(field.id, ligne.id)} 
              field={field} 
              key={field.id} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FieldLigneCard