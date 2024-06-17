import UploadFile from "./UploadImageClassroom";
import UploadResourceFile from "./UploadImageResource";
import { Counter } from "./Counter";
export default function Page() {
  return (
    <>
      <h1>Index Page</h1>
      <UploadResourceFile resourceId="GX7Qqa7eoDquZQffukezp" />
      <Counter/>
    </>
  );
}