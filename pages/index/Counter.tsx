import { onLogin } from "@/functions/onLogin.telefunc";
import { onRegister } from "@/functions/onRegister.telefunc";
import { onCheckSession } from "@/functions/onCheckSession.telefunc";
import { onCreateHeadquarters } from "@/functions/Headquarters/onCreateHeadquarters.telefunc";
import { onCreateClassroom } from "@/functions/Classroom/onCreateClassroom.telefunc";
import { onCreateResource } from "@/functions/Resources/onCreateResource.telefunc";

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
            headquarterId: "VxafSwVU3OYvJwFdizYJ-",
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
            headquarterId: "fCJ0jEFsG36aeRnv6Kh1W",
          })
        }
      >
        create resource
      </button>
    </>
  );
}
