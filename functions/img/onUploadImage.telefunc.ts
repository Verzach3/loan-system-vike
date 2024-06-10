
import type { ContextVariableMap } from "hono";
import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import fs from 'node:fs';

export async function onFileUpload(file: string, filename: string) {
    
    const { db, session } = getContext<TelefuncContext>();

    if (!session) {
        console.log("no user");
        return { error: 401 };
    }


    
    //TODO: save file to disk and wrrite the path to the database
    /*
        id + file
    */
    
    const fileContent = file.split(",")[1]
    console.log(fileContent.slice(0, 100));
    
    const fileBuffer = Buffer.from(fileContent, "base64");
    
}