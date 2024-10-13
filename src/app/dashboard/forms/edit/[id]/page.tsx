import EditRequestForm from "@/components/forms/edit-request-form";
import { FormServiceServer } from "@/services/form/server-actions";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const formId = params.id;

  const form = await FormServiceServer.show(formId as string);


  return (
    <div className='space-y-4'>
      <header className='text-3xl font-bold'>Création d'un nouveau formulaire</header>
      <EditRequestForm editForm={form.data} />
    </div>
  )
}
