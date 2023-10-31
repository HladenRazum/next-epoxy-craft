import AddProductForm from "./components/AddProductForm";

export default function ControlPanelPage() {
  return (
    <div className="py-20">
      <h1 className="mb-10 text-center">Контролен Панел</h1>
      <div className="grid place-items-center">
        <AddProductForm />
      </div>
    </div>
  );
}
