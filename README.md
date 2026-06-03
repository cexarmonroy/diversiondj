# Diversión DJ — Press Kit

Landing page profesional de **Cesar Monroy | Diversión DJ**, orientada a conversión de reservas para matrimonios, fiestas de empresa y eventos privados en Santiago, Chile.

## Características

- **Hero** con foto de perfil, social proof y CTA sticky en móvil
- **Secciones**: Sobre mí, experiencia, estilos musicales y testimonios
- **Formulario de reservas** integrado (sin Tally ni formularios externos)
- **Panel admin** en `/admin` para gestionar solicitudes
- **Persistencia** en Supabase (PostgreSQL)
- **Notificaciones por email** vía Resend al recibir una reserva nueva
- **WhatsApp** como canal secundario de cotización rápida
- Diseño **mobile-first**, tema oscuro con estética DJ/nocturna

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Resend](https://resend.com)
- [Zod](https://zod.dev) (validación)

## Requisitos

- Node.js 20+
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Resend](https://resend.com) (gratis, opcional para emails)

## Instalación

```bash
git clone <url-del-repo>
cd diversiondj
npm install
```

### 1. Variables de entorno

Copia la plantilla y completa tus credenciales:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (solo servidor, **nunca** en el cliente) |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |
| `SITE_URL` | URL pública del sitio (links en emails) |
| `RESEND_API_KEY` | API key de Resend (opcional) |
| `BOOKING_NOTIFY_EMAIL` | Email donde recibes avisos de reserva |
| `BOOKING_FROM_EMAIL` | Remitente del email (ver nota abajo) |

### 2. Base de datos Supabase

1. Crea un proyecto en Supabase
2. Ve a **SQL Editor** → **New query**
3. Ejecuta el contenido de [`supabase/schema.sql`](supabase/schema.sql)

### 3. Email con Resend (opcional)

Sin dominio propio puedes usar el modo de prueba:

```env
BOOKING_FROM_EMAIL=Diversión DJ <onboarding@resend.dev>
BOOKING_NOTIFY_EMAIL=tu@gmail.com
```

> En pruebas, Resend solo envía al email con el que te registraste. Para producción, verifica tu dominio en Resend y usa un remitente como `reservas@tudominio.cl`.

Si no configuras Resend, las reservas **igual se guardan** en Supabase; solo se omiten los emails.

### 4. Arrancar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page principal |
| `/reserva` | Página dedicada al formulario |
| `/#reserva` | Ancla al formulario en el home |
| `/admin` | Panel de gestión de reservas |

## Panel admin

1. Entra a `/admin`
2. Ingresa la contraseña definida en `ADMIN_PASSWORD`
3. Revisa solicitudes y cambia su estado: **Pendiente → Contactado → Confirmado → Cancelado**

## Estructura del proyecto

```
src/
├── app/                  # Rutas y layouts (Next.js App Router)
│   ├── actions/          # Server actions (reservas, auth admin)
│   ├── admin/            # Panel de administración
│   └── reserva/          # Página de reserva
├── components/           # Secciones UI y formulario
└── lib/                  # Config, Supabase, email, validación
public/images/            # Foto de perfil
supabase/schema.sql       # Schema de la tabla bookings
```

## Personalización

Edita [`src/lib/config.ts`](src/lib/config.ts) para marca, WhatsApp, Instagram y URLs.

Edita [`src/lib/content.ts`](src/lib/content.ts) para textos, testimonios y listas de servicios.

## Despliegue

Compatible con **Vercel**, **Railway**, **Render** o cualquier hosting Node.js.

Configura las mismas variables de `.env.local` en el panel de tu proveedor. En producción, actualiza `SITE_URL` a tu dominio real.

> **Importante:** no subas `.env` ni `.env.local` al repositorio. Solo `.env.example` como referencia.

## Licencia

Proyecto privado — Cesar Monroy · Diversión DJ.
