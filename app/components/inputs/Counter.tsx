import { FC } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onReduce = () => {
    if (value === 1) return;
    onChange(value - 1);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="flex items-center justify-center w-10 h-10 transition border rounded-full cursor-pointer border-neutral-400 text-neutral-600 hover:opacity-80"
          onClick={onReduce}
        >
          <AiOutlineMinus />
        </button>
        <p className="text-xl font-light text-neutral-600">{value}</p>
        <button
          className="flex items-center justify-center w-10 h-10 transition border rounded-full cursor-pointer border-neutral-400 text-neutral-600 hover:opacity-80"
          onClick={onAdd}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
