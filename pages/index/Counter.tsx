import { onLogin } from "@/functions/onLogin.telefunc";
import { onRegister } from "@/functions/onRegister.telefunc";
import { onCheckSession } from "@/functions/onCheckSession.telefunc";
import { onCreateHeadquarters } from "@/functions/Headquarters/onCreateHeadquarters.telefunc";
import { onCreateClassroom } from "@/functions/Classroom/onCreateClassroom.telefunc";
import { onCreateResource } from "@/functions/Resources/onCreateResource.telefunc";
import { onCreateClassroomRequest } from "@/functions/Requests/onCreateClassroomRequest.telefunc";
import { onCreateResourceRequest } from "@/functions/Requests/onCreateResourceRequest.telefunc";

export function Counter() {
  return (
    <>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() =>
          onRegister({
            email: "test@test.com",
            password: "123456",
            name: "test",
          })
        }
      >
        reg
      </button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => onLogin({ email: "test@test.com", password: "123456" })}
      >
        login
      </button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => onCheckSession()}>check</button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() =>
          onCreateHeadquarters({
            name: "test",
            description: "test",
            city: "test",
            country: "test",
          })
        }
      >
        create headquarter
      </button>
      
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() =>
          onCreateClassroom({
            name: "salon 12",
            description: "salon 12",
            status: "activo",
            headquarterId: "G2a2sLQMeDlp9rrM3kOTm",
          })
        }
      >
        create classroom
      </button>

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() =>
          onCreateResource({
            name: "proyector",
            description: "proyector epson",
            status: "activo",
            quantity: "10",
            headquarterId: "G2a2sLQMeDlp9rrM3kOTm",
          })
        }
      >
        create resource
      </button>

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button 
        onClick={() =>
          onCreateClassroomRequest(
            {
              userId: "rwfxatujykvxqc63",
              classroomId: "Zlag3Ie9fjQ92Qa30gigK",
              status: "pendiente",
              requestEndDate: "2021-10-10",
              requestStartDate: "2021-10-10",
              id: ""
            }
          )
        }
      >
        create classroom request
      </button>
    

        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
    <button onClick={() => onCreateResourceRequest(
          {
						userId: "rwfxatujykvxqc63",
						id: "",
						requestStartDate: " 2021-10-10",
						requestEndDate: " 2021-10-10",
						status: "pendiente",
            resourceId: "GX7Qqa7eoDquZQffukezp"
					}
        )}
      >
        create resource request
      </button>

    </>
  );
}
