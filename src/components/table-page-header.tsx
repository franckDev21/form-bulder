import { FC, ReactNode } from "react";

interface TablePageHeaderProps {
    className ?: string;
    title?: string;
    pdfDownloadLink ?: string;
    excelDownloadLink ?: string;
    handlePrint ?: () => void;
    children: ReactNode;
}

const TablePageHeader: FC<TablePageHeaderProps> = ({ 
    className = '', 
    title = '', 
    pdfDownloadLink='#',
    excelDownloadLink = '#',
    handlePrint = () => {},
    children
}) => {
  return (
    <header className={`${className} flex justify-between items-center`}>
        <h2 className=' text-3xl font-bold text-primary'>{title || 'Liste des demandes'}</h2>

        <div className='space-x-2 flex items-center'>
            <div className=""></div>
            {children}
        </div>
    </header>
  )
}

export default TablePageHeader