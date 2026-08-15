const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-ledger-pale bg-ledger-bg mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center text-center gap-1 text-xs text-ledger-tinted">
          <div>
            <span className="font-medium text-ledger-indigo">Ledger Blue</span> · Task Manager
          </div>
          <div>
            © {currentYear} · Created by Wendy Okoth
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;