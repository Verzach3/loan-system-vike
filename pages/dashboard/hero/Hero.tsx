

import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from './image.svg';
import classes from './heroStyle/HeroBullets.module.css';

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            ¡Bienvenido a LoanSystem de la Universidad del Valle!
          </Title>

          <Text c="dimmed" mt="md">
            Facilita la gestión de préstamos de salones y recursos universitarios. 
            Reserva de manera rápida y sencilla los espacios y equipos que necesitas. ¡Optimiza tu tiempo y recursos con LoanSystem!
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Peticiones de Salones</b> –  Las peticiones de salones se realizan de manera rápida y sencilla
            </List.Item>
            <List.Item>
              <b>Peticiones de Recursos</b> – Las peticiones de recursos se realizan de manera rápida y sencilla
            </List.Item>
            <List.Item>
              <b>Calendario eficiente</b> – Visualiza tus reservas de manera eficiente
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Reserva ahora
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
               Conoce más
            </Button>
          </Group>
        </div>
        <Image src="public/boy.svg" className={classes.image} />
      </div>
    </Container>
  );
}