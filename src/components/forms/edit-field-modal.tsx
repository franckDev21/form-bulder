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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
  },[field])

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
          <Input
            name="name"
            value={editedField.name}
            onChange={handleChange}
            placeholder="Nom du champ"
          />
          <Input
            name="placeholder"
            value={editedField.placeholder}
            onChange={handleChange}
            placeholder="Placeholder du champ"
          />
          <Input
            name="key"
            value={editedField.key}
            onChange={handleChange}
            placeholder="Clé du champ"
          />

          <Select
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

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={editedField.required}
              onCheckedChange={(checked) => setEditedField({ ...editedField, required: checked as boolean })}
            />
            <span>Requis</span>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={editedField.crypted}
              onCheckedChange={(checked) => setEditedField({ ...editedField, crypted: checked as boolean })}
            />
            <span>Crypter ce champ</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFieldModal;
