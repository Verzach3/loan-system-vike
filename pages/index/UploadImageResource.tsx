import { onFileUploadResource } from "@/functions/Upload/onUploadImageResource.telefunc";
import { Group, Button, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconFileUpload } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { reload } from "vike/client/router";

export default function UploadImageClassroom({ resourceId }: { resourceId: string }) {
	const openRef = useRef<() => void>(null);

	const [file, setFile] = useState<FileList>();
	const [result, setResult] = useState("");
  
 
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files);
    }
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!file) return;

		const reader = new FileReader();

    for (let i = 0; i < file.length; i++) {
      reader.readAsDataURL(file[i]);

      reader.onload = async () => {
        const base64url = reader.result as string;
        onFileUploadResource(base64url, {
          filename: file[i].name,
          resourceId,
        });
        setResult("Upload successful");
      };
    }
		
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="file" onChange={handleFileChange} accept="*/*" required />
				<button type="submit">Upload</button>
			</form>
			<div id="result">{result}</div>
			<Dropzone
				accept={{
					"image/jpeg": [".jpg", ".jpeg"],
					"image/png": [".png"],
				}}
				bg={"#edede9"}
				openRef={openRef}
				onDrop={async (files) => {
					for (const file of files) {
						//convert to base64
						const reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = async (e) => {
							const base64 = reader.result as string;
							await onFileUploadResource(base64, {
								filename: file.name,
								resourceId
							});
							notifications.show({
								title: `Archivo ${file.name} cargado correctamente`,
								message: "El archivo ha sido cargado correctamente",
							});
						};
						reload();
					}
				}}
				activateOnClick={false}
			>
				<Group justify="center">
					<Button
						onClick={() => openRef.current?.()}
						style={{ pointerEvents: "all" }}
						rightSection={<IconFileUpload />}
					>
						Agregar Archivos
					</Button>
				</Group>
			</Dropzone>
		</div>
	);
}
