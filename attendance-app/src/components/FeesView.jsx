import API from "../api";

const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
];

function FeesView({
                      students,
                      fetchStudents,
                  }) {
    async function toggleFee(
        studentId,
        month,
        current
    ) {
        await API.patch(
            `/students/${studentId}/fees`,
            {
                month,
                paid: !current,
            }
        );

        fetchStudents();
    }

    return (
        <div className="space-y-4">
            {students.map((student) => (
                <div
                    key={student._id}
                    className="bg-white rounded-3xl p-4 shadow-lg"
                >
                    <h3 className="font-bold mb-4">
                        {student.name}
                    </h3>

                    <div className="grid grid-cols-4 gap-2">
                        {months.map((month) => {
                            const paid =
                                student.fees?.[month];

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
                                    className={`py-2 rounded-2xl text-sm font-semibold ${
                                        paid
                                            ? "bg-green-500 text-white"
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