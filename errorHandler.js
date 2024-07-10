const handleError = error => {
  const { code, path } = error

  switch (code) {
    case 'ENOENT':
      console.error(`Error: 🚀 ~ file: ${path} not found`)
      break
    case 'EISDIR':
      console.error(`Error: 🚀 ~ informed path is not a file`)
      break
    default:
      console.error(`Error: 🚀 ~ file: ${error.path} not found`)
  }

  process.exit(1)
}

export default handleError
