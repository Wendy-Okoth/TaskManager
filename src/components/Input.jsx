const Input = ({ label, type, register, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-ledger-tinted mb-1">
      {label}
    </label>
    <input
      type={type}
      {...register}
      {...props}
      className="w-full px-3 py-2 border border-ledger-pale rounded focus:outline-none focus:ring-2 focus:ring-ledger-indigo/30 focus:border-ledger-indigo bg-white text-ledger-text"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

export default Input;