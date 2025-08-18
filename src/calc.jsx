import { useState, useEffect } from "react";

const Calc = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Safe evaluation function
  const safeEval = (expression) => {
    try {
      if (!/^[0-9+\-*/.()% ]+$/.test(expression)) {
        throw new Error("Invalid characters");
      }
      if (/[+\-*/.]{2,}/.test(expression) || /^[+*/%]/.test(expression)) {
        throw new Error("Invalid operator sequence");
      }
      const result = new Function(`return ${expression}`)();
      if (isNaN(result) || !isFinite(result)) {
        throw new Error("Invalid calculation");
      }
      return Number(result.toFixed(8)).toString();
    } catch {
      throw new Error("Calculation error");
    }
  };

  const handleClick = (value) => {
    setError("");
    if (value === "." && input.split(/[+/*-]/).pop().includes(".")) return;
    if (value === "%" && input.includes("%")) return;
    if (value === "0" && input === "0") return;
    setInput((prev) => prev + value);
  };

  const handleAC = () => {
    setInput("");
    setError("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleEqual = () => {
    if (!input) return;
    try {
      const result = safeEval(input);
      setInput(result);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      const validKeys = "0123456789+-*/.()";
      if (validKeys.includes(e.key)) {
        handleClick(e.key);
      } else if (e.key === "Enter" || e.key === "=") {
        handleEqual();
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Escape") {
        handleAC();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [input]);

  const buttonClass = "p-4 rounded-xl text-lg font-semibold shadow-md hover:opacity-90 transition duration-200";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-0" style={{ backgroundColor: "#111827" }}>
      <p
        className="text-4xl md:text-5xl mb-4 pb-5 font-semibold text-gray-100 tracking-tight"
        role="heading"
        aria-label="Basic Calculator"
      >
        Basic&nbsp;Calculator
      </p>

      <div className="p-6 rounded-3xl shadow-xl w-80" style={{ backgroundColor: "#374151" }}>
        {/* Display */}
        <div
          className="text-right p-4 rounded-xl text-2xl mb-4 font-mono shadow-inner"
          style={{ backgroundColor: "#D1D5DB", color: error ? "#EF4444" : "#111827" }}
        >
          {error || input || "0"}
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <button onClick={handleAC} className={buttonClass} style={{ backgroundColor: "#EF4444", color: "white" }}>
            AC
          </button>
          <button onClick={handleBackspace} className={buttonClass} style={{ backgroundColor: "#EF4444", color: "white" }}>
            ⌫
          </button>
          <button onClick={() => handleClick("/")} className={buttonClass} style={{ backgroundColor: "#3B82F6", color: "white" }}>
            /
          </button>
          <button onClick={() => handleClick("*")} className={buttonClass} style={{ backgroundColor: "#3B82F6", color: "white" }}>
            *
          </button>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <button onClick={() => handleClick("7")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            7
          </button>
          <button onClick={() => handleClick("8")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            8
          </button>
          <button onClick={() => handleClick("9")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            9
          </button>
          <button onClick={() => handleClick("-")} className={buttonClass} style={{ backgroundColor: "#3B82F6", color: "white" }}>
            -
          </button>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <button onClick={() => handleClick("4")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            4
          </button>
          <button onClick={() => handleClick("5")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            5
          </button>
          <button onClick={() => handleClick("6")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            6
          </button>
          <button onClick={() => handleClick("+")} className={buttonClass} style={{ backgroundColor: "#3B82F6", color: "white" }}>
            +
          </button>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <button onClick={() => handleClick("1")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            1
          </button>
          <button onClick={() => handleClick("2")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            2
          </button>
          <button onClick={() => handleClick("3")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            3
          </button>
          <button onClick={handleEqual} className={buttonClass} style={{ backgroundColor: "#10B981", color: "white" }}>
            =
          </button>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={() => handleClick("0")}
            className={`${buttonClass} col-span-2`}
            style={{ backgroundColor: "#E5E7EB", color: "#111827" }}
          >
            0
          </button>
          <button onClick={() => handleClick(".")} className={buttonClass} style={{ backgroundColor: "#E5E7EB", color: "#111827" }}>
            .
          </button>
          <button onClick={() => handleClick("%")} className={buttonClass} style={{ backgroundColor: "#3B82F6", color: "white" }}>
            %
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calc;