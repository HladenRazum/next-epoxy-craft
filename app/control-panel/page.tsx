import AddProductForm from "./components/AddProductForm"

export default function ControlPanelPage() {
  return (
    <div className="h-screen flex">
      {/* TODO:
        Add a side pannel
        add tabs for different content
        add product | all products | account information | etc
      
      
      */}

      <aside className="flex-1 border-r">menu</aside>
      <main className="p-5">
        <div className="grid place-items-center">
          <AddProductForm />
        </div>
      </main>
    </div>
  )
}
