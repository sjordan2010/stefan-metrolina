import CreateForm from "./CreateForm";

export default function Sidebar() {
  return (
    <aside className="fixed bg-green-600 pt-24 px-10 h-screen w-96">
      <CreateForm />
    </aside>
  );
}
