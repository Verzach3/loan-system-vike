import { useEffect } from "react";
export default function Page() {
  useEffect(() => {
    window.location.href = "/dashboard/resources"
  }, [])
  return null
    // <>
    //   <h1>Index Page</h1>
    //   <UploadResourceFile resourceId="GX7Qqa7eoDquZQffukezp" />
    //   <Counter/>
    // </>
}