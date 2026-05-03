import { useEffect, useState } from "react";

function EditModal({
                       open,
                       student,
                       onClose,
                       onSave,
                   }) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (student) {
            setName(student.name);
        }
    }, [student]);

    if (!open || !student) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-3xl p-5">
                <h2 className="text-xl font-bold mb-4">
                    Edit Student
                </h2>

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="w-full border rounded-2xl px-4 py-3 outline-none mb-4"
                    placeholder="Student name"
                />

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="py-3 rounded-2xl bg-gray-200 font-semibold"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            onSave(name)
                        }
                        className="py-3 rounded-2xl bg-blue-600 text-white font-semibold"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;