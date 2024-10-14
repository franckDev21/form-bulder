'use client';

import { FC } from "react";

import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className ?: string;
}

const BackButton: FC<BackButtonProps> = ({ className = '' }) => {

  const router = useRouter();

  return (
    <Button onClick={() => router.back()} size='xs' className={`items-center space-x-2 border inline-flex rounded-md p-2 ${className}`}>
      <FaArrowLeftLong className=' text-base' />
      <span>Page précédente</span>
    </Button>
  )
}

export default BackButton