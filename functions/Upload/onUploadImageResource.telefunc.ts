
import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import fs from 'node:fs';
import { nanoid } from "nanoid";
import { type resourceImageTableInsert, resourceImageTable } from "@/database/schema";

export async function onFileUploadResource(file: string, data: { filename: string, resourceId: string }) {
    
    const { db, session } = getContext<TelefuncContext>();

    if (!session) {
        console.log("no user");
        return { error: 401 };
    }

    const { resourceId, filename } = data;
    
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

    const uploadFile: resourceImageTableInsert = {
        resourceId,
        id: fileId,
        imageUrl: filePath
    }
    
    try {
        await db.insert(resourceImageTable).values(uploadFile);
    } catch(e) {
        console.log(`Error saving file to database: ${e}`);
        return { error: 500 };
    }

}