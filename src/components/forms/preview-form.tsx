import { FormModel } from "@/models/form"
import { FC } from "react";
import BackButton from "@/components/ui/back-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface PreviewFormProps {
  form: FormModel;
}

const PreviewForm: FC<PreviewFormProps> = ({ form }) => {
  
  return (
    <>
      <header className='text-2xl font-bold items-center space-x-2 flex'>
        <BackButton />
        <span className='space-x-2 inline-flex items-center'>
          <span>Previsualisation du formulaire</span>
          <span className=' text-gray-600 font-extrabold'>| #{form.id}</span>
        </span>
      </header>

      <div className=' bg-white border rounded-md p-4'>
        <header>
          <div className=' px-3 py-2 rounded-md bg-slate-100'>
            <strong>Nom du formulaire: </strong> {form.name}
          </div>
        </header>
        {form.lignes.map(ligne => (
          <div key={ligne.id} className={`w-full gap-4 grid grid-cols-${ligne.column_count}`}>
            {ligne.fields.map(field => (
              <div key={field.id} className='flex py-2 flex-col justify-start items-start space-y-2'>
                <span className=' text-sm font-semibold'>{field.name}</span>
                {field.type === 'input' && 
                  <Input type={field.crypted ? 'password': 'text'} placeholder={`${field.placeholder}`} />
                }
                {field.type === 'textarea' && 
                  <Textarea placeholder={`${field.placeholder}`}></Textarea>
                }
                {field.type === 'select' && 
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                    {(field?.options ?? []).map((option, index) => (
                      <SelectItem className='py-2' key={index} value={option?.key ?? ''}>
                        {option?.value ?? ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                }
              </div> 
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default PreviewForm