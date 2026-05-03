import API from "../api";

const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
];

function FeesView({
                      students,
                      setStudents,
                  }) {
    async function toggleFee(
        studentId,
        month,
        current
    ) {
        const newValue = !current;

        // instant UI update
        setStudents((prev) =>
            prev.map((student) =>
                student._id === studentId
                    ? {
                        ...student,
                        fees: {
                            ...student.fees,
                            [month]: newValue,
                        },
                    }
                    : student
            )
        );

        try {
            await API.patch(
                `/students/${studentId}/fees`,
                {
                    month,
                    paid: newValue,
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="space-y-4">
            {students.map((student) => (
                <div
                    key={student._id}
                    className="bg-white rounded-3xl p-4 shadow-lg"
                >
                    <h3 className="font-bold mb-4 text-lg">
                        {student.name}
                    </h3>

                    <div className="grid grid-cols-4 gap-2">
                        {months.map((month) => {
                            const paid =
                                student.fees?.[month] || false;

                            return (
                                <button
                                    key={month}
                                    onClick={() =>
                                        toggleFee(
                                            student._id,
                                            month,
                                            paid
                                        )
                                    }
                                    className={`py-2 rounded-2xl text-sm font-semibold transition-all ${
                                        paid
                                            ? "bg-green-600 text-white shadow"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeesView;