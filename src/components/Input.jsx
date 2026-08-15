/**
 * Reusable Form Input Component
 * Encapsulates standard styling, label management, validation error display, 
 * and registration bindings for React Hook Form across auth and task forms.
 */
const Input = ({ label, type = "text", register, error, ...props }) => (
  <div className="mb-4">
    {/* Field label utilizing Ledger Blue muted tint for hierarchy */}
    <label className="block text-sm font-medium text-ledger-tinted mb-1">
      {label}
    </label>
    
    {/* 
      Spread register bindings (from react-hook-form) alongside standard input props.
      Custom focus and border states align with the single-hue design system.
    */}
    <input
      type={type}
      {...register}
      {...props}
      className="w-full px-3 py-2 border border-ledger-pale rounded focus:outline-none focus:ring-2 focus:ring-ledger-indigo/30 focus:border-ledger-indigo bg-white text-ledger-text"
    />
    
    {/* Conditional validation error rendering for graceful error state handling */}
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

export default Input;