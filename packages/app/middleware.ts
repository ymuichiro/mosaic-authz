export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/index'],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signOut',
  },
};
