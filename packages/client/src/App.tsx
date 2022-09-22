import { FlagsProvider } from '@lib/flags'
import { Main } from '@pages/main'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <FlagsProvider>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </FlagsProvider>
  )
}

export default App
