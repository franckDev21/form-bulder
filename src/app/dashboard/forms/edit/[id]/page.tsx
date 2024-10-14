import EditRequestForm from "@/components/forms/edit-request-form";
import ShowFormAndPreviewWrapper from "@/components/forms/show-form-and-preview-wrapper";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { FormServiceServer } from "@/services/form/server-actions";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const formId = params.id;

  const form = await FormServiceServer.show(formId as string);


  return (
    <div className='space-y-4'>
      <header className='text-3xl font-bold items-center space-x-2 flex'>
        <span>Création d'un nouveau formulaire</span>
        <Button asChild size='xs' className='items-center space-x-2 border inline-flex rounded-md p-2'>
          <Link href={ROUTES.Dashboard.Form.preview(form.data.id)}>
            <FaEye className=' text-base' />
            <span>Voir le previsualisation</span>
          </Link>
        </Button>
      </header>
      <EditRequestForm editForm={form.data} />
    </div>
  )
}
