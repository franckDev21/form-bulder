'use client';

import { FC, useState } from "react"
import RequestForm from "./request-form"
import { PostRequestFormData } from "@/types/form"
import { FormServiceClient } from "@/services/form/client-actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/route";
import toast from "react-hot-toast";
import { FormModel } from "@/models/form";
import { formatFieldsOptions } from "@/helpers/forms";

interface EditRequestFormProps {
  editForm: FormModel;
}

const EditRequestForm: FC<EditRequestFormProps> = ({ editForm }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const saveForm = async (data: PostRequestFormData) => {
    setLoading(true);    
    try {
      await FormServiceClient.update(editForm.id, formatFieldsOptions(data));
      toast.success('Votre formulaire a été modifié avec succès !');
      router.push(ROUTES.Dashboard.Form.home)
    } catch (error) {
      console.log(error);
    } finally { setLoading(false) }
  }

  return (
    <div>
      <RequestForm editForm={editForm} loading={loading} handleSubmit={saveForm} />
    </div>
  )
}

export default EditRequestForm