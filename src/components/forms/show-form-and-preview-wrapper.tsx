import { FormModel } from "@/models/form";
import { FC, ReactNode } from "react";
import PreviewForm from "./preview-form";

interface ShowFormAndPreviewWrapperProps {
  showPreview ?: boolean;
  formData ?: FormModel;
  children: ReactNode;
}

const ShowFormAndPreviewWrapper: FC<ShowFormAndPreviewWrapperProps> = ({ 
  showPreview = false,
  formData,
  children
}) => {
  return (
    <>
      {showPreview && formData && <PreviewForm form={formData} />}
      {!showPreview && children}
    </>
  )
}

export default ShowFormAndPreviewWrapper