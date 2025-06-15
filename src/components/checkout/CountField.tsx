import MinusIcon from "@/assets/icons/minus.svg";
import PlusIcon from "@/assets/icons/plus.svg";

type CountFieldProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export const CountField = ({
  value,
  onChange,
  min = 2,
  max = Infinity,
}: CountFieldProps) => {
  const add = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };
  const remove = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const buttonClass =
    "w-12 h-12 rounded-full bg-green text-white flex items-center justify-center disabled:bg-gray-100 disabled:text-purple/20 transition-colors duration-200 ease-in-out";

  return (
    <div className="flex items-center p-1 border-2 border-purple rounded-full justify-between">
      <button onClick={remove} className={buttonClass} disabled={value <= min}>
        <MinusIcon className="w-4 fill-current" />
      </button>
      <span className="px-6">{value}</span>
      <button onClick={add} className={buttonClass} disabled={value >= max}>
        <PlusIcon className="w-4 fill-current" />
      </button>
    </div>
  );
};
