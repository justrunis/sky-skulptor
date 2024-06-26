export default function Footer({ ...props }) {
  const getCurrentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-center p-16 mt-auto bg-primary text-primary-content">
      <p color="blue-gray" className="font-normal">
        &copy;Sky Skulptor {getCurrentYear}, Justinas Runevičius
      </p>
    </footer>
  );
}
