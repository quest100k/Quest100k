/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next infers the workspace root from the nearest lockfile, which lands
  // outside the repo if a stray one sits in a parent directory. Pinning it
  // keeps module resolution predictable on any machine.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
