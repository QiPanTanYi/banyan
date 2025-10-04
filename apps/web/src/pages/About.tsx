function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is a React application with the following tech stack:</p>
      <ul>
        <li><strong>Frontend:</strong> React 18 + TypeScript</li>
        <li><strong>Routing:</strong> React Router DOM</li>
        <li><strong>Build Tool:</strong> Vite</li>
        <li><strong>Code Quality:</strong> Biome (formatting & linting)</li>
        <li><strong>Monorepo:</strong> Turborepo</li>
        <li><strong>Package Manager:</strong> pnpm</li>
      </ul>
      <p>Compatible with Node.js 18.12.1+</p>
    </div>
  )
}

export default About