
import type { ContextVariableMap } from "hono";
import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import fs from 'node:fs';
import { nanoid } from "nanoid";
import { classroomImageTableInsert, classroomImageTable } from "@/database/schema";

export async function onFileUploadClassroom(file: string, data: { filename: string, classroomId: string }) {
    
    const { db, session } = getContext<TelefuncContext>();

    if (!session) {
        console.log("no user");
        return { error: 401 };
    }

    const { classroomId, filename } = data;

    
    //TODO: save file to disk and wrrite the path to the database
    /*
        id + file
    */
    
    const fileContent = file.split(",")[1]
    console.log(fileContent.slice(0, 100));
    
    const fileBuffer = Buffer.from(fileContent, "base64");
    const fileId = nanoid();
    const uniqueFilename = `${fileId}-${filename}`;
    const filePath = `public/images/${uniqueFilename}`;

    // try saving the file to disk
    try {
        fs.writeFileSync(filePath, fileBuffer);
    } catch (error) {
        console.log(`Error writing file: ${error}`);
        return { error: 500 };
    }

    // try saving the file path to the database

    const uploadFile: classroomImageTableInsert = {
        classroomId,
        id: fileId,
        imageUrl: filePath
    }
    
    try {
        await db.insert(classroomImageTable).values(uploadFile).execute();
    } catch(e) {
        console.log(`Error saving file to database: ${e}`);
        return { error: 500 };
    }


}