import AddProductForm from "./components/AddProductForm/AddProductForm"
import Sidebar from "./components/Sidebar"

export default function ControlPanelPage() {
  return (
    <div className="min-h-screen flex">
      {/* TODO:
        Add a side pannel
        add tabs for different content
        add product | all products | account information | etc
      
      
      */}

      {/* <Sidebar /> */}
      <main className="p-5">
        <div className="grid place-items-center">
          <AddProductForm />
        </div>
      </main>
    </div>
  )
}
