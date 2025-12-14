import { addComicAction } from "@/actions/comic-actions";

export function AddComicForm() {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Add New Comic</h2>
      <form action={addComicAction} className="flex gap-3">
        <input
          type="text"
          name="isbn"
          placeholder="ISBN (e.g., 978-84-679-4260-6)"
          required
          className="flex-1 rounded-lg border-gray-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition shadow-md active:scale-95"
        >
          Add
        </button>
      </form>
    </section>
  );
}
