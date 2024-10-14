import PreviewForm from "@/components/forms/preview-form";
import { FormServiceServer } from "@/services/form/server-actions";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const formId = params.id;

  const form = await FormServiceServer.show(formId as string);

  return (
    <div className='space-y-4'>
      <PreviewForm form={form.data} />
    </div>
  )
}
