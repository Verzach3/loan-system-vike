import { UnstyledButton, Group, Avatar, Text, rem, ThemeIcon } from '@mantine/core';
import { IconChevronRight, IconUser } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useQuery } from '@tanstack/react-query';
import { onGetUserData } from '@/functions/onGetUserData.telefunc';

export function UserButton() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: onGetUserData,
  })
  
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <ThemeIcon size={"xl"} radius={"xl"}>
          <IconUser/>
        </ThemeIcon>

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {data?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {data?.email}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}