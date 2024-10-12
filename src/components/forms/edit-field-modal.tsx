'use client';

import { FC, useEffect, useState } from "react";
import { FieldType } from "@/types/form";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Éditer le champ</DialogTitle>
          <DialogDescription>
            Formulaire d'édition d'un champ.
          </DialogDescription>
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
                  {/* Ajoutez d'autres types si nécessaire */}
                </SelectContent>
              </Select>
            </div>
          </div>
          

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
