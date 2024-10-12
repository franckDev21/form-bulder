import CreateRequestForm from "@/components/forms/create-request-form";

export default async function CreateForm() {
  return (
    <div className='space-y-4'>
      <header className='text-3xl font-bold'>Création d'un nouveau formulaire</header>
      <CreateRequestForm />
    </div>
  )
}
