import CreateForm from "./CreateForm";

export default function Sidebar() {
  return (
    <aside className="fixed bg-white shadow-xl pt-24 px-8 h-screen w-96">
      <CreateForm />
    </aside>
  );
}
