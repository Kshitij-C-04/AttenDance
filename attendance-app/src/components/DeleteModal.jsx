function DeleteModal({
                         open,
                         student,
                         onClose,
                         onConfirm,
                     }) {
    if (!open || !student) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-sm p-6">
                <h2 className="text-xl font-bold mb-2">
                    Delete Student?
                </h2>

                <p className="text-gray-600 mb-6">
                    {student.name} will be removed.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-2xl bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-2xl bg-red-600 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;