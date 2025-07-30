export const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto w-full px-4 py-5 border-[orange] border-t sm:px-6 lg:px-8 mt-auto">
      <div className="text-center text-amber-800">
        <p>© {new Date().getFullYear()} Forum about recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};
