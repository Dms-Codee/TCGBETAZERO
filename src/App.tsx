import {
  Link,
  Route,
  Routes,
} from 'react-router'

function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Proyecto Zero
      </h1>

      <p className="mt-4">
        MVP inicial funcionando.
      </p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        About
      </h1>
    </div>
  )
}

function App() {
  return (
    <main className="min-h-screen p-8">
      <nav className="mb-8 flex gap-4">
        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </main>
  )
}

export default App