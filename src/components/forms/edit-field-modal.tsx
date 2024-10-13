'use client';

import { FC, useEffect, useState } from "react";
import { FieldType, OptionKeyValueType } from "@/types/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

interface EditFieldModalProps {
  isOpen: boolean;
  field: FieldType;
  onClose: () => void;
  onSave: (field: FieldType) => void;
}

const EditFieldModal: FC<EditFieldModalProps> = ({ isOpen, field, onClose, onSave }) => {
  const [editedField, setEditedField] = useState<FieldType>(field);
  const [newOption, setNewOption] = useState<OptionKeyValueType>({ key: '', value: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedField({ ...editedField, [name]: value });
  };

  const handleSave = () => {
    onSave(editedField);
    onClose();
  };

  useEffect(() => {
    setEditedField(field);
  }, [field]);

  const handleAddOption = () => {
    if (newOption.value) { // 'key' is auto-generated, so just check if value is provided
      setEditedField((prevField) => ({
        ...prevField,
        options: [...(prevField.options || []), {key: newOption.key || `option_${(editedField.options ?? []).length + 1}`, value: newOption.value}],
      }));
      setNewOption({ key: '', value: '' });
    }
  };
  
  const handleRemoveOption = (index: number) => {
    setEditedField((prevField) => ({
      ...prevField,
      options: prevField.options?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Éditer le champ</DialogTitle>
          <DialogDescription>Formulaire d'édition d'un champ.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2 grid-cols-2">
            <div className='space-y-2'>
              <Label htmlFor="name">Nom du champ</Label>
              <Input
                name="name"
                id="name"
                value={editedField.name}
                onChange={handleChange}
                placeholder="Nom du champ"
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                name="placeholder"
                id="placeholder"
                value={editedField.placeholder}
                onChange={handleChange}
                placeholder="Placeholder du champ"
              />
            </div>
          </div>

          <div className="grid gap-2 grid-cols-2">
            <div className='space-y-2'>
              <Label htmlFor="key">Clé du champ</Label>
              <Input
                name="key"
                id="key"
                value={editedField.key}
                onChange={handleChange}
                placeholder="Clé du champ"
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="type">Type de champ <span className='uppercase text-orange-400 text-xs font-bold px-1'>[ {editedField.type} ]</span></Label>
              <Select
                name="type"
                onValueChange={(value) => setEditedField({ ...editedField, type: value as FieldType['type'] })}
                value={editedField.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type de champ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input">Input</SelectItem>
                  <SelectItem value="textarea">Textarea</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Ajouter des options si le type de champ est 'select' */}
          {editedField.type === 'select' && (
            <div className="space-y-2 bg-slate-100 p-2 rounded-md">
              <Label>Options</Label>
              <div className="grid gap-2 grid-cols-2">
                <Input
                  name="key"
                  className=' bg-slate-100 hidden'
                  disabled
                  value={newOption.key || `option_${(editedField.options?.length || 0)+1}`}
                  onChange={(e) => setNewOption({ ...newOption, key: e.target.value })}
                  placeholder="Clé"
                />
                <Input
                  name="value"
                  value={newOption.value}
                  className=' col-span-2 bg-white'
                  onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
                  placeholder="Valeur"
                />
              </div>
              <Button variant="outline" size='sm' onClick={handleAddOption}>
                Ajouter une option
              </Button>
              <div className="mt-2">
                {editedField.options?.map((option, index) => (
                  <div key={index} className="flex justify-between space-y-2 items-center">
                    <span>Option_{index+1}: {option.value}</span>
                    <button  type="button" className=' px-3 py-1 bg-red-500 text-white rounded-md text-xs' onClick={() => handleRemoveOption(index)}>
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={editedField.required}
              onCheckedChange={(checked) => setEditedField({ ...editedField, required: checked as boolean })}
            />
            <Label>Requis</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={editedField.crypted}
              onCheckedChange={(checked) => setEditedField({ ...editedField, crypted: checked as boolean })}
            />
            <Label>Crypter ce champ</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFieldModal;
