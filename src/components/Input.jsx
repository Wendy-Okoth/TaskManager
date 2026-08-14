const Input = ({ label, type, register, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-[#5B6470] dark:text-[#9CA3AF] mb-1">
      {label}
    </label>
    <input
      type={type}
      {...register}
      {...props}
      className="w-full px-3 py-2 border border-[#E5E4E1] dark:border-[#2E303A] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3F6C51] bg-white dark:bg-[#1C1C1A] text-[#1C1C1A] dark:text-[#FAFAF7] font-sans"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

export default Input;