const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-ledger-pale bg-ledger-bg mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-ledger-tinted">
          <div>
            <span className="font-medium text-ledger-indigo">Ledger Blue</span> · Task Manager
          </div>
          <div className="flex items-center gap-4">
            <span>© {currentYear}</span>
            <span>·</span>
            <span>Created by Wendy Okoth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;