import { addComicAction } from "@/actions/comic-actions";

export function AddComicForm() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Add New Comic</h2>
      <form action={addComicAction} className="flex gap-3">
        <input
          type="text"
          name="isbn"
          placeholder="ISBN (e.g., 978-84-679-4260-6)"
          required
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-2 font-medium text-white shadow-md transition hover:bg-gray-800 active:scale-95"
        >
          Add
        </button>
      </form>
    </section>
  );
}
