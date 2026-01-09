export function TimeBar({ value, max }) {
    const percentage = Math.min((value / max) * 100, 100); // Calculate fill percentage

    return (
        <div
            style={{
                width: "100%",
                height: "20px",
                backgroundColor: "#ccc",
                borderRadius: "5px",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    width: `${percentage}%`,
                    height: "100%",
                    backgroundColor: "blue",
                }}
            />
        </div>
    );
}
