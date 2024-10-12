'use client'

import { FC, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { UserModel } from "@/models/user";
import { UserServiceClient } from "@/services/user/client-actions";
import FieldFormBulder from "./field-form-bulder";
import { FieldLigneType, PostRequestFormData } from "@/types/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit avoir au moins 2 caractères." }), // Correction ici
  validated_user_id: z.string({ message: 'Vous devez sélectionner celui qui doit valider votre formulaire.' }), // Correction ici
});

interface RequestFormProps {
  className?: string;
  handleSubmit: (formData: PostRequestFormData) => void;
  loading: boolean;
}

const RequestForm: FC<RequestFormProps> = ({ className = "", handleSubmit, loading }) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [lignes, setLignes] = useState<FieldLigneType[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit({ lignes,...values });
  }

  // Fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      const dataResponse = await UserServiceClient.listing();
      setUsers(dataResponse.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className={`${className} bg-white rounded-md p-4 border`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Nom du formulaire</FormLabel>
                <FormControl>
                  <Input type="input" placeholder="Entrer le nom du formulaire" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validated_user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Sélectionnez le validateur</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className='text-sm italic'>
                  (Le validateur est celui qui validera le formulaire pour qu'il passe en production)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* composant de genererations des lignes du formulaire */}
          <FieldFormBulder handleLigneChange={(fieldLignes) => {
            setLignes(fieldLignes);
            console.log(fieldLignes);
          }} />

          {/* Bouton de soumission */}
          <Button type="submit" disabled={loading} className="w-full font-bold">
            {loading && 
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Patientez...
              </>
            }
            {!loading && 'Enregistrer votre formulaire'}
          </Button>
        </form>
      </Form>
    </div>
  )
};

export default RequestForm;
