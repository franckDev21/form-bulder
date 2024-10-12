import { columns } from "@/components/forms/columns";
import { DataTable } from "@/components/forms/data-table";
import TablePageHeader from "@/components/table-page-header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { FormServiceServer } from "@/services/form/server-actions";
import Link from "next/link";

async function getData(){
  try {
    return await FormServiceServer.listing()
  } catch (error) {
    console.log(error);
  }
}

export default async function Forms() {
  const response = await getData()

  return (
    <div className="h-screen w-full justify-center items-center">
      <TablePageHeader className='mb-10 mt-12'>
        <Button asChild className=' font-semibold'>
          <Link href={ROUTES.Dashboard.Form.create}>Nouvelle Demande</Link>
        </Button>
      </TablePageHeader>

      <DataTable columns={columns} data={response?.data ?? []} />
    </div>
  );
}
