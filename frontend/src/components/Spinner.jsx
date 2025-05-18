export const ButtonSpinner = ({
  text,
}) => (
  <div className="flex items-center justify-center">
    <div
      className="mr-3 animate-spin rounded-full border-t-transparent border-3 border-blue-300 w-6 h-6"
    ></div>
    {text}
  </div>
);

const Spinner = ({
  text,
}) => (
  <div className="flex flex-col items-center justify-center w-full h-full py-10">
    <div
      className="animate-spin rounded-full border-t-transparent border-4 border-blue-500 w-10 h-10"
    ></div>
    {text}
  </div>
);

export default Spinner;
