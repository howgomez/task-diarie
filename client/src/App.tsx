import AppRoutes from "./router/AppRoutes"
import { LayoutPage } from "./layout/LayoutPage"
function App() {
  return (
    <>
      <LayoutPage>
        <AppRoutes />
      </LayoutPage>
    </>
  )
}

export default App
