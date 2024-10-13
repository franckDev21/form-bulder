'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { FormServiceClient } from "@/services/form/client-actions";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import toast from "react-hot-toast";

interface DeleteAlertProps {
  formId: string;
}

// Utilisation de React.forwardRef pour DeleteAlert
const DeleteAlert = forwardRef<HTMLButtonElement, DeleteAlertProps>(({ formId }, ref) => {

  const router = useRouter();

  const handleDelete = async (formId: string) => {
    try {
      await FormServiceClient.delete(formId);
      toast.success('Votre formulaire a été supprimé avec succès !');

      // Rafraîchir les données après la suppression
      router.refresh();  // Ceci force la réactualisation des données dans un composant Server

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={ref} variant="outline" className="w-full">Supprimer le formulaire</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voulez-vous vraiment supprimer ce formulaire ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible, ce qui signifie que vous ne pourrez plus récupérer ce formulaire.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(formId)}>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
});

DeleteAlert.displayName = "DeleteAlert";

export default DeleteAlert;
