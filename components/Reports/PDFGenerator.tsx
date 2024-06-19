

import { onCheckRole } from '@/functions/middleware/onCheckRole.server';
import { onCheckUser } from '@/functions/middleware/onCheckUser.telefunc';
import { TelefuncContext } from '@/types';
import jsPDF from 'jspdf';
import { getContext } from 'telefunc';

export default async function PDFGenerator({userId}: {userId: string}) {

    const { db, session } = getContext<TelefuncContext>();

    const isUser = await onCheckUser(userId);

    if (!isUser) {
        return {
            status: 404,
            body: "User not found",
            error: true
        };
    }
    
    const { authorized } = await onCheckRole(db, session?.user.id ?? "", ["admin"]);

    if (!authorized) {
        return {
            status: 401,
            body: "Unauthorized",
            error: true
        };
    }

    //TODO: Create headers
    const createHeaders = (keys: any) => {
        
    }

    //TODO: Create rows
    const createRows = (keys: any) => {
        
    }

    //TODO: generate PDF file
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.text(`User ${isUser.user?.name} request report`, 80, 20);
    
        doc.save(`${isUser.user?.name} request report.pdf`);
      };


    

  return (
    <>
      
    </>
  )
}
