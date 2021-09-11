export default function Layout({ children }) {
  return (
    <div className="border border-gray-50 shadow-md rounded-md p-4 container mx-auto max-w-2xl bg-white mt-8">
      {children}
    </div>
  );
}
