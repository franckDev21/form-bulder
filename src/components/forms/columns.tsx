/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormModel } from "@/models/form";
import { ColumnDef } from "@tanstack/react-table";
import { AvatarUser } from "../Header/AvatarUser";

import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateFR } from "@/helpers/forms";

import DeleteAlert from "./delete-alert";
import Link from "next/link";
import { ROUTES } from "@/config/route";

export const columns: ColumnDef<FormModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Nom",
    header: "Nom",
    cell: ({ row }) => (
      <span className="font-bold">{row.original.name}</span>
    ),
    filterFn: (row, columnId, filterValue) => {
      return row.original.name
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;

      return (
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-full ${
            status
              ? "bg-green-100 text-green-700"
              : " bg-orange-200 text-orange-500"
          }`}
        >
          {status ? "Activé" : "Non confirmé"}
        </span>
      );
    },
  },
  {
    accessorKey: "Date de création",
    header: ({ column }) => {
      return (
        <span
          className='inline-flex w-[150px] items-center cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Date de création</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      )
    },
    cell: ({ row }) => (
      <span className="font-bold w-[150px]">{formatDateFR(row.original.created_at)}</span>
    ),
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.created_at);
      const dateB = new Date(rowB.original.created_at);
      return dateA.getTime() - dateB.getTime();
    },
  },
  {
    accessorKey: "Créé par",
    header: "Créé par",
    cell: ({ row }) => (
      <div className="flex space-x-3 items-center py-2 px-2">
        <AvatarUser />
        <div className="flex flex-col space-y-1">
          <span className="font-bold">{row.original.author.name}</span>
          <span>{row.original.author.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Date de validation",
    header: "Date de validation",
    cell: ({ row }) => (
      <span className="font-bold">#{row.original.validated_at || ""}</span>
    ),
  },
  {
    accessorKey: "Validateur",
    header: "Validateur",
    cell: ({ row }) => (
      <div className="flex space-x-3 items-center py-2 px-2">
        <AvatarUser />
        <div className="flex flex-col space-y-1">
          <span className="font-bold">{row.original.user_validated.name}</span>
          <span>{row.original.user_validated.email}</span>
        </div>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const form = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(form.id)}
            >
              Copy form ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Voir les reponses utilisateurs</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.Dashboard.Form.edit(row.original.id)}>Voir les details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteAlert formId={row.original.id}  />
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
