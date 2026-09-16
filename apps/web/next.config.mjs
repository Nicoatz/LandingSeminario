/** @type {import('next').NextConfig} */
const nextConfig = {
  // Los paquetes del workspace se publican como TypeScript sin build propio;
  // Next.js necesita transpilarlos igual que a su propio código fuente.
  transpilePackages: ['@rentar/ui', '@rentar/shared-types'],
}

export default nextConfig
