'use client';

import { useState } from "react"
import RequestForm from "./request-form"
import { PostRequestFormData } from "@/types/form"
import { FormServiceClient } from "@/services/form/client-actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/route";
import toast from "react-hot-toast";
import { formatFieldsOptions } from "@/helpers/forms";

const CreateRequestForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const saveForm = async (data: PostRequestFormData) => {
    setLoading(true);
    try {
      await FormServiceClient.store(formatFieldsOptions(data));
      toast.success('Votre formulaire a été créé avec succès !');
      router.refresh();
      router.push(ROUTES.Dashboard.Form.home)
    } catch (error) {
      console.log(error);
    } finally { setLoading(false) }
  }

  return (
    <div>
      <RequestForm loading={loading} handleSubmit={saveForm} />
    </div>
  )
}

export default CreateRequestForm