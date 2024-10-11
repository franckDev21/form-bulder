/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useState } from "react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PiEye, PiEyeClosed } from "react-icons/pi"

import toast from "react-hot-toast"
import { login } from "@/services/auth";
import { ROUTES } from "@/config/route";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
})

interface LoginFormProps {
  className?: string;
}

const LoginForm: FC<LoginFormProps> = ({ className = '' }) => {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  // 2. Définir un gestionnaire de soumission.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    // setIsLoading(true);
    try {
      const response = await login(values)
      toast.success(response.message ?? 'Vous êtes maintenant connecté !');
      form.reset() // reset form
  
      // redirect to dashboard page 
      router.push(ROUTES.Dashboard.home);
    } catch (error) {
      console.log(error);
      
        toast.error((error as any)?.response?.data?.message || "Identifiant ou mot de passe incorrect ");
    } finally {
        // setIsLoading(false);
    }

  }

  return (
    <Card className={`w-[350px] ${className}`}>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Entrez vos informations de connexion.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid w-full items-center gap-4">
              {/* Champ Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="Entrez votre email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ Mot de passe avec affichage/masquage */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Entrez votre mot de passe"
                          {...field}
                          className='pr-10'
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <PiEyeClosed size={20} /> : <PiEye size={20} />}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      (Le mot de passe doit contenir au moins 8 caractères.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bouton de soumission */}
              <Button type="submit" disabled={form.formState.isLoading} className="w-full">
                {form.formState.isLoading && 
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                }
                {!form.formState.isLoading && 'Se connecter'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
