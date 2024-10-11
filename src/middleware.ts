import { NextResponse, type NextRequest } from 'next/server';
import { checkAuth } from '@/services/check-auth';


async function validateToken(token: string | undefined) {
  if (!token) {
    return false;
  }
  
  try {
    const response =  await checkAuth();
    
    return response.status === 200;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  // Liste des routes privées qui nécessitent une authentification
  const privateRoutes = ['/dashboard', '/profile', '/settings', '/checkout'];
  const isPrivateRoute = privateRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  const token = req.cookies.get('access_token')?.value;

  // Vérifiez la validité du token
  const isTokenValid = await validateToken(token);  

  // Si l'utilisateur est authentifié mais essaie d'accéder à une route d'authentification
  if (isTokenValid && req.nextUrl.pathname.startsWith('/auth') || isTokenValid && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard'; // Rediriger vers une route protégée
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route privée
  if (!isTokenValid && isPrivateRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/'; // Rediriger vers la page de connexion
    return NextResponse.redirect(url);
  }

  // Autoriser la demande
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Excluez les chemins statiques et d'images
};
