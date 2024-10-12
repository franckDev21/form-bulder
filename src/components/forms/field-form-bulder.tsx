'use client';

import { FieldLigneType, FieldType } from "@/types/form";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import FieldLigneCard from "./field-ligne-card";
import EditFieldModal from "./edit-field-modal";

interface FieldFormBulderProps {
  handleLigneChange: (lignes: FieldLigneType[]) => void;
}

const FieldFormBulder: FC<FieldFormBulderProps> = ({ handleLigneChange }) => {
  const [fieldLignes, setfieldLignes] = useState<FieldLigneType[]>([]);
  const [fieldToEdit, setFieldToEdit] = useState<FieldType | null>(null); // Champ à éditer
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Contrôle de la modal

  const addNewLigne = () => {
    const newLigne: FieldLigneType = {
      id: Date.now(),
      column_count: 1,
      fields: []
    };
    const updatedLignes = [...fieldLignes, newLigne];
    setfieldLignes(updatedLignes);
    handleLigneChange(updatedLignes);
  };

  const addNewField = (ligneId: number) => {
    const updatedLignes = fieldLignes.map((ligne) => {
      if (ligne.id === ligneId) {
        const newField: FieldType = {
          id: Date.now(),
          name: "Nouveau champ",
          placeholder: "Entrez une valeur",
          required: false,
          crypted: false,
          type: "input",
          key: `field-${ligne.fields.length + 1}`
        };
        const newColumnCount = ligne.fields.length + 1 > 2 ? 2 : ligne.fields.length + 1; 
        return { ...ligne, fields: [...ligne.fields, newField], column_count: newColumnCount };
      }
      return ligne;
    });
    setfieldLignes(updatedLignes);
    handleLigneChange(updatedLignes);
  };

  const handleEditField = (field: FieldType) => {
    setFieldToEdit(field);
    setIsEditModalOpen(true); // Ouvrir la modal d'édition
  };

  const handleFieldUpdate = (updatedField: FieldType) => {
    const updatedLignes = fieldLignes.map((ligne) => ({
      ...ligne,
      fields: ligne.fields.map(field => field.id === updatedField.id ? updatedField : field)
    }));
    setfieldLignes(updatedLignes);
    handleLigneChange(updatedLignes);
  };

  const handleDeleteLigne = (lineId: number) => {
    const deleteOk = window.confirm("Voulez vous vraiment supprimer cette ligne ? ")

    if(deleteOk){
      const updatedLignes = fieldLignes.filter(ligne => ligne.id !== lineId);
      setfieldLignes(updatedLignes);
      handleLigneChange(updatedLignes);
    }
  } 

  const handleDeleteField = (fieldId: number, ligneId: number) => {
    const deleteOk = window.confirm("Voulez vous vraiment supprimer ce champ ? ");
  
    if (deleteOk) {
      const updatedLignes = fieldLignes.map(ligne => {
        if (ligne.id === ligneId) {
          const updatedFields = ligne.fields.filter(field => field.id !== fieldId);
          const newColumnCount = updatedFields.length > 2 ? 2 : updatedFields.length;
          
          return { ...ligne, fields: updatedFields, column_count: newColumnCount }; // Mise à jour du column_count
        }
        return ligne;
      });
  
      setfieldLignes(updatedLignes);
      handleLigneChange(updatedLignes);
    }
  };

  return (
    <div className='bg-gray-50 rounded-md p-4 border-dashed border-2'>
      <header className='flex mb-10 justify-end items-center'>
        <button onClick={addNewLigne} type='button' className='px-4 space-x-2 text-xs py-1 bg-white rounded-lg items-center inline-flex border'>
          <Plus size={16} />
          <span>Ajouter une nouvelle ligne de formulaire</span>
        </button>
      </header>

      {fieldLignes.length === 0 && 
        <div className=' flex flex-col bg-white border p-2 rounded-md justify-center items-center'>
          <h2 className='text-sm font-semibold text-gray-700'>Aucune ligne de formulaire</h2>
          <span className=' text-xs italic text-gray-500'>Cliquez sur le bouton <strong>'Ajouter'</strong> pour ajouter une nouvelle ligne </span>
        </div>
      }

      <div className='space-y-3'>
        {fieldLignes.map(ligne => (
          <FieldLigneCard 
            handleAddField={() => addNewField(ligne.id)} 
            handleEditField={handleEditField}
            handleDeleteField={handleDeleteField}
            deleteLine={() => handleDeleteLigne(ligne.id)}
            key={ligne.id} 
            ligne={ligne} 
          />
        ))}
      </div>

      {fieldToEdit && (
        <EditFieldModal
          isOpen={isEditModalOpen}
          field={fieldToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleFieldUpdate}
        />
      )}
    </div>
  );
};

export default FieldFormBulder;
