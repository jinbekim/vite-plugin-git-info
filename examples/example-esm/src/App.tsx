function App() {
  console.log(import.meta.env)
  return (
    <>
    <p>
      {import.meta.env.GIT_COMMIT}
      {import.meta.env.GIT_TAG}
    </p>
    </>
  )
}

export default App
