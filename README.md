# R3

## Descripción

R3 es una aplicación web desarrollada con React y TypeScript que permite a los usuarios crear, gestionar y visualizar tareas. Utiliza una combinación de tecnologías modernas como TailwindCSS para el diseño, Radix UI para componentes accesibles y Framer Motion para animaciones fluidas.

## Características

- **Crear Tareas**: Los usuarios pueden crear nuevas tareas con un título, descripción y estado de completado.
- **Visualizar Tareas**: Las tareas se pueden visualizar en una lista con detalles completos.
- **Animaciones**: Animaciones suaves y atractivas utilizando Framer Motion.
- **Componentes Accesibles**: Utiliza Radix UI para asegurar que los componentes sean accesibles.

## Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **TypeScript**: Superset de JavaScript que añade tipos estáticos.
- **TailwindCSS**: Framework de CSS para un diseño rápido y eficiente.
- **Radix UI**: Componentes accesibles y sin estilos.
- **Framer Motion**: Biblioteca para animaciones en React.
- **LocalStorage**: Para el almacenamiento de tareas en el navegador.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/TomasDmArg/pdi-r3.git
    cd pdi-r3
    ```

2. Instala las dependencias:
    ```bash
    bun install
    ```

3. Inicia la aplicación:
    ```bash
    bun run start
    ```

## Scripts Disponibles

En el proyecto, puedes ejecutar los siguientes scripts:

- `bun run start`: Inicia la aplicación en modo de desarrollo.
- `bun run build`: Construye la aplicación para producción.
- `bun run test`: Ejecuta las pruebas.
- `bun run eject`: Expulsa la configuración de Create React App.

## Estructura del Proyecto

```plaintext
R3/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── typographies.tsx
│   ├── data/
│   │   └── tasks.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── CreateTask.tsx
│   │   ├── Home.tsx
│   │   └── TaskDetail.tsx
│   ├── types/
│   │   └── list.ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── routes.tsx
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```