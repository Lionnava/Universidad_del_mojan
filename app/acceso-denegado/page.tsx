// Archivo: app/acceso-denegado/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AccesoDenegado() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold text-slate-800">Acceso Denegado</h1>
        <p className="mt-2 text-slate-600">
          No tienes los permisos necesarios para acceder a esta página.
          Por favor, contacta al administrador si crees que esto es un error.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Volver al Inicio</Button>
        </Link>
      </div>
    </div>
  );
}
